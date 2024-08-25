import {
  cookieOptions,
  emitEvent,
  sendToken,
  uploadFilesToCloudinary,
} from "../utils/features.js";
import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/eveents.js";
import { getOtherMember } from "../lib/helper.js";

const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;
  const file = req.file;

  if (!file) return next(new ErrorHandler("Pleas Upload avatar"));

  const result = await uploadFilesToCloudinary([file]);

  const avatar = {
    public_id: result[0].public_id,
    url: result[0].secure_url,
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User created successfully");
});

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid username or password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Invalid usernaem or Password", 404));

  sendToken(res, user, 200, `Welcome Back to ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({
    success: true,
    user,
  });
});

const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("chattu-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

const searchUser = TryCatch(async (req, res) => {
  const { name = "" } = req.query;

  const myChats = await Chat.find({ groupChat: false, members: req.user });

  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });

  const users = allUsersExceptMeAndFriends.map((_id, name, avatar) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  res.status(200).json({
    success: true,
    users,
  });
});

const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) return next(new ErrorHandler("Request already sent", 404));

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  res.status(201).json({
    success: true,
    message: "Friend Request Sent Successfully",
  });
});

const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  if (!request) return next(new ErrorHandler("Request not found", 404));

  if (request.receiver._id !== req.user.toString())
    return next(
      new ErrorHandler("You are not allowed authorized to accept request", 401)
    );

  if (!accept) {
    await request.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Friend Request Cancelled Successfully",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name} - ${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  res.status(200).json({
    success: true,
    message: "Friend Request Accepted",
    senderId: req.sender._id,
  });
});

const getMyNotifications = TryCatch(async (req, res) => {
  const request = await Request.findOne({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );

  const allRequests = request.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));

  return res.status(200).json({
    success: true,
    allRequests,
  });
});

const getMyFriends = TryCatch(async (req, res) => {
  const chatId = req.query.chatId;

  const chats = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");

  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user);

    return {
      _id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);

    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    );

    return res.status(200).json({
      success: true,
      friends: availableFriends,
    });
  } else {
    return res.status(200).json({
      success: true,
      friends,
    });
  }
});

export {
  newUser,
  login,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
  getMyFriends
};
