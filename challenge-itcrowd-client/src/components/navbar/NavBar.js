import { AppBar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import LoginButton from "../login/Login";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../profile-menu/ProfileMenu";

export default function NavBar() {
  const { isAuthenticated } = useAuth0();

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
        <h1>Cellphone shop</h1>
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
          <ProfileMenu />
        </Box>
      )}
    </AppBar>
  );
}
