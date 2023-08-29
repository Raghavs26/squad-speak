import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/alertActions";

const AlertNotification = ({
  showAlertMessage,
  closeAlertMessage,
  alertMessageContent,
}) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showAlertMessage}
        onClose={closeAlertMessage}
        autoHideDuration={6000}
      >
        <Alert severity="info">{alertMessageContent}</Alert>
      </Snackbar>
    </>
  );
};

AlertNotification.propTypes = {
  showAlertMessage: PropTypes.bool.isRequired,
  closeAlertMessage: PropTypes.func.isRequired,
  alertMessageContent: PropTypes.string,
};

const mapStoreStateToProps = ({ alert }) => {
  return {
    ...alert,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export const AlertNotificationComponent = connect(
  mapStoreStateToProps,
  mapActionsToProps
)(AlertNotification);
