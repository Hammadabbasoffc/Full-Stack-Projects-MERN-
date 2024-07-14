import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React, { Fragment } from "react";
// import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
// import { TypingLoader } from "../components/layout/Loaders";
// import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/Styles/StyledComponents";
import { grayColor, orange } from "../constants/color";

const Chat = ({
  chatId,
  user,
  containerRef,
  bottomRef,
  allMessages,
  userTyping,
  message,
  messageOnChange,
  submitHandler,
  handleFileOpen,
  fileMenuAnchor,
}) => {
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
       

       

        <div ref={bottomRef} />
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
          padding={"1rem"}
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
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChange}
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

      {/* <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} /> */}
    </Fragment>
  );
};

export default AppLayout(Chat);
