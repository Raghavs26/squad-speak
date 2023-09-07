import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

import Avatar from "../../../shared/components/Avatar.jsx";

const MainContainer = styled("div")({
  width: "97%",
  display: "flex",
  marginTop: "10px",
});

const AvatarContainer = styled("div")({
  width: "70px",
});

const MessageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const MessageContent = styled("div")({
  color: "#DCDDDE",
});

const SameAuthorMessageContent = styled("div")({
  color: "#DCDDDE",
  width: "97%",
});

const SameAuthorMessageText = styled("span")({
  marginLeft: "70px",
});

const Message = ({ content, sameAuthor, username, date, sameDay }) => {
  if (sameAuthor && sameDay) {
    return (
      <SameAuthorMessageContent>
        <SameAuthorMessageText>{content}</SameAuthorMessageText>
      </SameAuthorMessageContent>
    );
  }

  return (
    <MainContainer>
      <AvatarContainer>
        <Avatar username={username} />
      </AvatarContainer>
      <MessageContainer>
        <Typography style={{ fontSize: "1rem", color: "white" }}>
          {username}{" "}
          <span style={{ fontSize: "0.75rem", color: "#72767d" }}>{date}</span>
        </Typography>
        <MessageContent>{content}</MessageContent>
      </MessageContainer>
    </MainContainer>
  );
};

Message.propTypes = {
  content: PropTypes.string.isRequired,
  sameAuthor: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  sameDay: PropTypes.bool.isRequired,
};

export default Message;
