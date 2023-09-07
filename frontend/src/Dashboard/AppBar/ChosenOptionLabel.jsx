import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography } from "@mui/material";

const ChosenOptionLabel = ({ name }) => {
  return (
    <Typography
      sx={{ fontSize: "1rem", color: "white", fontWeight: "bold" }}
    >{`${name ? `Chosen conversation: ${name}` : ""}`}</Typography>
  );
};

ChosenOptionLabel.propTypes = {
  name: PropTypes.string.isRequired,
};

ChosenOptionLabel.defaultProps = {
  name: "",
};

const mapStoreStateToProps = (state) => {
  return {
    name: state.chat.chosenChatDetails?.name,
  };
};

export const ChosenOptionLabelComponent =
  connect(mapStoreStateToProps)(ChosenOptionLabel);
