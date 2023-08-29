import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const CustomPrimaryButton = ({
  label,
  additionalStyles,
  disabled,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: "#5865F2",
        color: "white",
        textTransform: "none",
        fontSize: "1rem",
        fontWeight: 500,
        width: "100%",
        height: "2.5rem",
      }}
      style={additionalStyles || {}}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

CustomPrimaryButton.propTypes = {
  label: PropTypes.string.isRequired,
  additionalStyles: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

CustomPrimaryButton.defaultProps = {
  additionalStyles: {},
  disabled: false,
  onClick: () => {},
};

export default CustomPrimaryButton;
