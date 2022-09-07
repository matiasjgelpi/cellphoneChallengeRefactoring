import { useState } from "react";
import {Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Settings from "@mui/icons-material/Settings";
import LogoutButton from "../logout/Logout";
import style from "./style.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const { user } = useAuth0();
  const isAdministrator = useSelector(
    (state) => state.user.user.isAdministrator
  );

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <img
            src={user?.picture}
            style={{ width: "35px", height: "35px", borderRadius: "50%" }}
            alt="user avatar"
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        {isAdministrator && (
          <MenuItem>
            <Settings color="primary" />{" "}
            <Link to="admin" className={style.link}>
              Admin Page
            </Link>
          </MenuItem>
        )}
        <MenuItem>
          <LogoutButton></LogoutButton>
        </MenuItem>
      </Menu>
    </>
  );
}
