import { useEffect } from "react";
import { styled } from "@mui/system";
import PropTypes from "prop-types";

import { MessagesComponent as Messages } from "./Messages/Messages";
import { NewMessageInputComponent as NewMessageInput } from "./NewMessageInput.jsx";
import { getDirectChatHistory } from "../../realtimeCommunication/socketConnection";

const Wrapper = styled("div")({
  flexGrow: 1,
});

const MessengerContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  );
};

MessengerContent.propTypes = {
  chosenChatDetails: PropTypes.object.isRequired,
};
MessengerContent.defaultProps = {
  chosenChatDetails: {},
};

export default MessengerContent;
