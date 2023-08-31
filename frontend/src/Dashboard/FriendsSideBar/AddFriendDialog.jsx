import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DialogTitle, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { validateMail } from "../../shared/utils/validators";
import InputWithLabel from "../../shared/components/InputWithLabel";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";

const AddFriendDialog = ({
  isDialogOpen,
  closeDialogHandler,
  sendFriendInvitation,
}) => {
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState("");

  const handleSendInvitation = () => {
    // send friend request to server
  };

  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail("");
  };

  useEffect(() => {
    setIsFormValid(validateMail(mail));
  }, [mail, setIsFormValid]);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography>Invite a Friend</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Enter e-mail address of friend which you would like to invite
            </Typography>
          </DialogContentText>
          <InputWithLabel
            label="Mail"
            type="text"
            value={mail}
            setValue={setMail}
            placeholder="Enter mail address"
          />
        </DialogContent>
        <DialogActions>
          <CustomPrimaryButton
            onClick={handleSendInvitation}
            disabled={!isFormValid}
            label="Send"
            additionalStyles={{ margin: "0 1rem 0.625rem 1rem" }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddFriendDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  closeDialogHandler: PropTypes.func.isRequired,
  sendFriendInvitation: PropTypes.func.isRequired,
};

AddFriendDialog.defaultProps = {
  isDialogOpen: false,
  closeDialogHandler: () => {},
  sendFriendInvitation: () => {},
};

export default AddFriendDialog;
