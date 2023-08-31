import { styled } from "@mui/system";
import DropdownMenu from "./DropDownMenu";

const MainContainer = styled("div")({
  position: "absolute",
  right: "0",
  top: "0",
  height: "3rem",
  borderBottom: "1px solid black",
  backgroundColor: "#36393f",
  width: "calc(100% - 326px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 1rem",
});

const AppBar = () => {
  return (
    <MainContainer>
      <DropdownMenu />
    </MainContainer>
  );
};

export default AppBar;
