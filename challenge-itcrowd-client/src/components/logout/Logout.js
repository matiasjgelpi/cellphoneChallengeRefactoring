import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
import { useEffect } from "react";

export default function LogoutButton() {
  const { logout, isAuthenticated, user} = useAuth0();
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.user.user)

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(login(user))
    }
  },[isAuthenticated, user, dispatch])

  console.log(isAuthenticated)
  

  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      Logout
    </Button>
  );
}
