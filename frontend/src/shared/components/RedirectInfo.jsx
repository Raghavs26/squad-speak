import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const RedirectText = styled("span")({
  color: "#00AFF4",
  fontWeight: 500,
  cursor: "pointer",
});

const RedirectInfo = ({
  text,
  redirectText,
  additionalStyles,
  redirectHandler,
}) => {
  return (
    <Typography
      sx={{ color: "#72767d" }}
      style={additionalStyles || {}}
      variant="subtitle2"
    >
      {text}
      <RedirectText onClick={redirectHandler}>{redirectText}</RedirectText>
    </Typography>
  );
};

RedirectInfo.propTypes = {
  text: PropTypes.string.isRequired,
  additionalStyles: PropTypes.object.isRequired,
  redirectHandler: PropTypes.func.isRequired,
  redirectText: PropTypes.string.isRequired,
};

RedirectInfo.defaultProps = {
  additionalStyles: {},
  text: "",
  redirectText: "",
  redirectHandler: () => {},
};

export default RedirectInfo;
