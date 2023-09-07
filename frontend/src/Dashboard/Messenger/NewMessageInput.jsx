import { useState } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { sendDirectMessage } from "../../realtimeCommunication/socketConnection";

const MainContainer = styled("div")({
  height: "60px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Input = styled("input")({
  backgroundColor: "#2f3136",
  width: "98%",
  height: "2.75rem",
  color: "white",
  border: "none",
  borderRadius: "0.5rem",
  fontSize: "0.875rem",
  padding: "0 10px",
});

const NewMessageInput = ({ chosenChatDetails }) => {
  const [message, setMessage] = useState("");

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <MainContainer>
      <Input
        placeholder={`Write message to ${chosenChatDetails.name}`}
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
      />
    </MainContainer>
  );
};

NewMessageInput.propTypes = {
  chosenChatDetails: PropTypes.object.isRequired,
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export const NewMessageInputComponent =
  connect(mapStoreStateToProps)(NewMessageInput);
