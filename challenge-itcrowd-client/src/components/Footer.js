import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Box
      style={{
        backgroundColor: "pink",
        display: "flex",
        justifyContent: "end",
        padding: "5px",
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
    </Box>
  );
}
