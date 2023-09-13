import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton.jsx";
import CreateRoomButton from "./CreateRoomButton.jsx";

const MainContainer = styled("div")({
  width: "4.5rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});

const SideBar = () => {
  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton />
    </MainContainer>
  );
};

export default SideBar;
