import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LoginPageFooter from "./LoginPageFooter.jsx";
import LoginPageHeader from "./LoginPageHeader.jsx";
import LoginPageInputs from "./LoginPageInputs.jsx";
import { validateLoginForm } from "../../shared/utils/validators";
import AuthBox from "../../shared/components/AuthBox.jsx";
import { getActions } from "../../store/actions/authActions";

const LoginPage = ({ login }) => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = () => {
    const userDetails = {
      mail,
      password,
    };

    login(userDetails, navigate);
  };

  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export const LoginPageComponent = connect(null, mapActionsToProps)(LoginPage);
