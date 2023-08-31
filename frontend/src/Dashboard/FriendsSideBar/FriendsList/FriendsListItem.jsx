import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import OnlineIndicator from "./OnlineIndicator";
import Avatar from "../../../shared/components/Avatar";

const FriendsListItem = ({ id, username, isOnline }) => {
  return (
    <Button
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

FriendsListItem.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
};



// FriendsListItem.defaultProps = {
//   id: 0,
//   username: "",
//   isOnline: false,
// };

export default FriendsListItem;
