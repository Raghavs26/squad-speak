import { styled } from "@mui/system";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import WelcomeMessage from "./WelcomeMessage.jsx";
import MessengerContent from "./MessengerContent.jsx";

const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#36393f",
  marginTop: "3rem",
  display: "flex",
});

const Messenger = ({ chosenChatDetails }) => {
  return (
    <MainContainer>
      {!chosenChatDetails ? (
        <WelcomeMessage />
      ) : (
        <MessengerContent chosenChatDetail={chosenChatDetails} />
      )}
    </MainContainer>
  );
};

Messenger.propTypes = {
  chosenChatDetails: PropTypes.object,
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export const MessengerComponent = connect(mapStoreStateToProps)(Messenger);
