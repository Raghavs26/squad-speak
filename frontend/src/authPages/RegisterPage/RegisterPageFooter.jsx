import Proptypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton.jsx";
import RedirectInfo from "../../shared/components/RedirectInfo.jsx";

const getFormNotValidMessage = () => {
  return "Username should contains between 3 and 12 characters and password should contains between 6 and 12 character. Also correct e-mail address should provided";
};

const getFormValidMessage = () => {
  return "Press to register!";
};

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const navigate = useNavigate();

  const handlePushToLoginPage = () => {
    navigate("/login");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyles={{ marginTop: "1.875rem" }}
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text=""
        redirectText="Already have an account ?"
        additionalStyles={{ marginTop: "0.375rem" }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

RegisterPageFooter.propTypes = {
  handleRegister: Proptypes.func.isRequired,
  isFormValid: Proptypes.bool.isRequired,
};

RegisterPageFooter.defaultProps = {
  isFormValid: false,
};

export default RegisterPageFooter;
