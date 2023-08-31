import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";

const MainPageButton = () => {
  return (
    <Button
      style={{
        width: "3rem",
        height: "3rem",
        borderRadius: "1rem",
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: "10px",
        color: "#fff",
        backgroundColor: "#5865F2",
      }}
    >
      <GroupsIcon />
    </Button>
  );
};

export default MainPageButton;
