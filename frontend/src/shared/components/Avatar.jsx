import PropTypes from "prop-types";
import { styled } from "@mui/system";

const AvatarPreview = styled("div")({
  height: "2.5rem",
  width: "2.5rem",
  backgroundColor: "#5865f2",
  borderRadius: "2.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: "400",
  fontSize: "1.25rem",
});

const Avatar = ({ username, large }) => {
  return (
    <AvatarPreview style={large ? { height: "5rem", width: "5rem" } : {}}>
      {username.substring(0, 2)}
    </AvatarPreview>
  );
};

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
  large: PropTypes.bool,
};

Avatar.defaultProps = {
  large: false,
};

export default Avatar;
