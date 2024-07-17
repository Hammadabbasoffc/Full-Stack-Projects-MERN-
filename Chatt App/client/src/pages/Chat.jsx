import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { Container, IconButton, Stack } from "@mui/material";
import React, { Fragment, useRef, useState } from "react";
import { grayColor, orange } from "../constants/color";
import AppLayout from "../components/layout/AppLayout";

// Assuming InputBox, MessageComponent, and TypingLoader are defined somewhere in your codebase
import { InputBox } from "../components/Styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import {sampleMessage} from '../constants/sampleData'
import MessageComponent from "../components/shared/MessageComponent";
const Chat = () => {
  const containerRef  = useRef(null)
  const fileMenuRef = useRef(null)
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [userTyping, setUserTyping] = useState(false);

  const user = {
    _id: "lkasjdhv",
    name: "Hammad Abbas"
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setUserTyping(true);
  };

  const handleFileOpen = () => {
    console.log("File open clicked");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setAllMessages([...allMessages, { _id: Date.now(), text: message }]);
    setMessage("");
    setUserTyping(false);
  };

  return (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {sampleMessage.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
           direction={"row"}
           height={"100%"}
           padding={"0.5rem"}
           alignItems={"center"}
           position={"relative"}
           
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
            ref={fileMenuRef}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={handleMessageChange}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </Fragment>
  );
};

export default AppLayout()(Chat);
