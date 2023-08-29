import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import AuthBox from "../../shared/components/AuthBox.jsx";
import RegisterPageInputs from "./RegisterPageInputs.jsx";
import RegisterPageFooter from "./RegisterPageFooter.jsx";
import { validateRegisterForm } from "../../shared/utils/validators.js";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ register }) => {
  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const handleRegister = () => {
    const userDetails = {
      mail,
      password,
      username,
    };

    register(userDetails, navigate);
  };

  useEffect(() => {
    setIsFormValid(
      validateRegisterForm({
        mail,
        username,
        password,
      })
    );
  }, [mail, username, password, setIsFormValid]);

  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: "white " }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      />
    </AuthBox>
  );
};

RegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export const RegisterPageComponent = connect(
  null,
  mapActionsToProps
)(RegisterPage);
