import { Paper, Typography } from "@mui/material";

export default function PageNotFound() {
  return (
    
        <Paper
          elevation={3}
          sx={{
            minHeight:"85vh",
            backgroundColor: "lightblue",
            tranparent: true,
            margin: "1rem",
            padding: "0 10% 0 10%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Typography variant="h3" textAlign="center" width="100%">
            Page not found
          </Typography>
      
        </Paper>
      );
}
