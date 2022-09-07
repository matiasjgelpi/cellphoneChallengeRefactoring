import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { useEffect } from "react";
import Logout from "@mui/icons-material/Logout"

export default function LogoutButton() {
  const { logout, isAuthenticated, user} = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(login(user))
    }
  },[isAuthenticated, user, dispatch])
  

  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      <Logout/> Logout
    </Button>
  );
}
