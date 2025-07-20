import { Stack, Box, Typography, Button, Paper } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface logoutProps {
  open: boolean;
  onClose: () => void;
}

function Logout({ open, onClose }: logoutProps) {
  const navigate = useNavigate();
  if (!open) return null;

  function handleLogout() {
    // hndle call to api and stuff
    toast.success("You have been logged out.");
    navigate("/");
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
      onClick={() => onClose()}
    >
      <Paper
        onClick={(e) => e.stopPropagation()}
        sx={{ textAlign: "center", p: "3rem", borderRadius: ".5rem" }}
      >
        <Typography variant="h6"> Logout</Typography>

        <Typography gutterBottom>Are you sure you want to logout?</Typography>
        <Stack direction={"row"} spacing={"1rem"} mt={"1rem"}>
          <Button variant="outlined" fullWidth onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Logout;
