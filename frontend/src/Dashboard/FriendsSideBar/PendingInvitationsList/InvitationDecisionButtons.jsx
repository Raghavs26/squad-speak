import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const InvitationDecisionButtons = ({
  disabled,
  acceptInvitationHandler,
  rejectInvitationHandler,
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        style={{ color: "white" }}
        disabled={disabled}
        onClick={acceptInvitationHandler}
      >
        <CheckIcon />
      </IconButton>
      <IconButton
        style={{ color: "white" }}
        disabled={disabled}
        onClick={rejectInvitationHandler}
      >
        <ClearIcon />
      </IconButton>
    </Box>
  );
};

InvitationDecisionButtons.propTypes = {
  disabled: PropTypes.bool.isRequired,
  acceptInvitationHandler: PropTypes.func.isRequired,
  rejectInvitationHandler: PropTypes.func.isRequired,
};

InvitationDecisionButtons.defaultProps = {
  disabled: false,
  acceptInvitationHandler: () => {},
  removeEventListener: () => {},
};

export default InvitationDecisionButtons;
