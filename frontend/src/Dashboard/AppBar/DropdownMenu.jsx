import { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { logout } from "../../shared/utils/auth";
import { getActions } from "../../store/actions/roomActions";

const DropdownMenu = ({ audioOnly, setAudioOnly }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAudioOnlyChange = () => {
    setAudioOnly(!audioOnly);
    handleMenuClose();
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen} style={{ color: "white" }}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
        <MenuItem onClick={handleAudioOnlyChange}>
          {audioOnly ? "Audio Only Enabled" : "Audio Only Disabled"}
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return { ...room };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

DropdownMenu.propTypes = {
  audioOnly: PropTypes.bool,
  setAudioOnly: PropTypes.func.isRequired,
};

export const DropdownMenuComponent = connect(
  mapStoreStateToProps,
  mapActionsToProps
)(DropdownMenu);
