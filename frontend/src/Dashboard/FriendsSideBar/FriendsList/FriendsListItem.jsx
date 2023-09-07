import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";

import OnlineIndicator from "./OnlineIndicator";
import Avatar from "../../../shared/components/Avatar";
import { chatTypes, getActions } from "../../../store/actions/chatActions";

const FriendsListItem = ({ id, username, isOnline, setChosenChatDetails }) => {
  const handlChoseActiveConversation = () => {
    setChosenChatDetails({ id, name: username }, chatTypes.Direct);
  };

  return (
    <Button
      onClick={handlChoseActiveConversation}
      style={{
        width: "100%",
        height: "2.625rem",
        marginTop: "0.625rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
    >
      <Avatar username={username} />
      <Typography
        style={{
          marginLeft: "0.5rem",
          fontWeight: 700,
          color: "#8e9297",
        }}
        variant="subtitle1"
        align="left"
      >
        {username}
      </Typography>
      {isOnline && <OnlineIndicator />}
    </Button>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

FriendsListItem.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
  setChosenChatDetails: PropTypes.func.isRequired,
};

// FriendsListItem.defaultProps = {
//   id: 0,
//   username: "",
//   isOnline: false,
// };

export const FreindsListItemComponent = connect(
  null,
  mapActionsToProps
)(FriendsListItem);
