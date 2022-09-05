import { AppBar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import LoginButton from "../login/Login";
import LogoutButton from "../logout/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

export default function NavBar() {
  const { user, isAuthenticated } = useAuth0();
  const isAdministrator = useSelector(state => state.user.user.isAdministrator)

  console.log(isAuthenticated)
  return (
    <AppBar
      sx={{
        backgroundColor: "pink",
        padding: "1rem",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      color="secondary"
      position="static"
    >
      <Link
        style={{
          textDecoration: "none",
          color: "white",
        }}
        to="/"
      >
        <h1>Itcrowd cellphones</h1>
      </Link>

      {!isAuthenticated ? (
        <LoginButton></LoginButton>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <LogoutButton></LogoutButton>

         {isAdministrator && <Link
            style={{
              textDecoration: "none",
              color: "white",
            }}
            to="admin"
          >
            <h3>Admin Page</h3>
          </Link>}
          <img
            src={user.picture}
            style={{ width: "35px", height: "35px", borderRadius: "50%" }}
            alt="user avatar"
          />
        </Box>
      )}
    </AppBar>
  );
}
