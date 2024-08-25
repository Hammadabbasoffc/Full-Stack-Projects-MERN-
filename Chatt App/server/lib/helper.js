export const getOtherMember = (members, userId) =>
  members.find((member) => member._id.toString() !== userId.toString());  // Removed unnecessary _id on userId


export const getSockets = (users = []) => {
  const sockets = users.map((user) => userSocketID.get(user.toString()));

  return sockets;
};

export const getBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;  // Added return statement and removed space in the base64 string
};
