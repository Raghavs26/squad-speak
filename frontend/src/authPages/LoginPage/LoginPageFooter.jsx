import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton.jsx";
import RedirectInfo from "../../shared/components/RedirectInfo.jsx";

const getFormNotValidMessage = () => {
  return "Enter correct e-mail address and password should contains between 6 and 12 characters";
};

const getFormValidMessage = () => {
  return "Press to log in!";
};

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const navigate = useNavigate();

  const handlePushToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Log in"
            additionalStyles={{ marginTop: "1.875rem" }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Need an account? "
        redirectText="Create an account"
        additionalStyles={{ marginTop: "0.375rem" }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};

LoginPageFooter.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
};

LoginPageFooter.defaultProps = {
  isFormValid: false,
};

export default LoginPageFooter;
