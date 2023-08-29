import PropTypes from "prop-types";
import InputWithLabel from "../../shared/components/InputWithLabel.jsx";

const LoginPageInputs = ({ mail, setMail, password, setPassword }) => {
  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="E-mail"
        type="text"
        placeholder="Enter e-mail address"
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter password"
      />
    </>
  );
};

LoginPageInputs.propTypes = {
  mail: PropTypes.string.isRequired,
  setMail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

LoginPageInputs.defaultProps = {
  mail: "",
  password: "",
};

export default LoginPageInputs;
