import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const FriendsTitle = ({ title }) => {
  return (
    <Typography
      sx={{
        textTransform: "uppercase",
        color: "#8e9297",
        fontSize: "0.875rem",
        marginTop: "0.625rem",
      }}
    >
      {title}
    </Typography>
  );
};

FriendsTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

FriendsTitle.defaultProps = {
  title: "",
};

export default FriendsTitle;
