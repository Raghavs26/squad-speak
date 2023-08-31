import { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip, Typography, Box } from "@mui/material";

import Avatar from "../../../shared/components/Avatar";
import InvitationDecisionButtons from "./InvitationDecisionButtons.jsx";

const PendingInvitationsListItem = ({
  id,
  username,
  mail,
  acceptFriendInvitation = () => {},
  rejectFriendInvitation = () => {},
}) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const handleAcceptInvitation = () => {
    acceptFriendInvitation({ id });
    setButtonsDisabled(true);
  };

  const handleRejectInvitation = () => {
    rejectFriendInvitation({ id });
    setButtonsDisabled(true);
  };

  return (
    <Tooltip title={mail}>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            height: "2.5rem",
            marginTop: "0.625rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar username={username} />
          <Typography
            sx={{
              marginLeft: "7px",
              fontWeight: 700,
              color: "#8e9297",
              flexGrow: 1,
            }}
            variant="subtitle1"
          >
            {username}
          </Typography>
          <InvitationDecisionButtons
            disabled={buttonsDisabled}
            acceptInvitationHandler={handleAcceptInvitation}
            rejectInvitationHandler={handleRejectInvitation}
          />
        </Box>
      </div>
    </Tooltip>
  );
};

PendingInvitationsListItem.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  mail: PropTypes.string.isRequired,
  acceptFriendInvitation: PropTypes.func.isRequired,
  rejectFriendInvitation: PropTypes.func.isRequired,
};

PendingInvitationsListItem.defaultProps = {
  username: "",
  mail: "",
  acceptFriendInvitation: () => {},
  rejectFriendInvitation: () => {},
};

export default PendingInvitationsListItem;
