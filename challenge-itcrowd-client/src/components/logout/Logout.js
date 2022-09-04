import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export default function LogoutButton() {
  const { logout, user} = useAuth0();

  console.log(user)

  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      Logout
    </Button>
  );
}
