import PropTypes from "prop-types";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
});

const Label = styled("p")({
  color: "#b9bbbe",
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "1rem",
});

const Input = styled("input")({
  flexGrow: 1,
  height: "2.5rem",
  border: "1px solid black",
  borderRadius: "0.375rem",
  color: "#dcddde",
  background: "#35393f",
  margin: 0,
  fontSize: "1rem",
  padding: "0 0.375rem",
});

const InputWithLabel = ({ value, setValue, label, type, placeholder }) => {
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={handleValueChange}
        type={type}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

InputWithLabel.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

InputWithLabel.defaultProps = {
  value: "",
  type: "text",
  placeholder: "",
};

export default InputWithLabel;
