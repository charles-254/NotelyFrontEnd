import { Stack, Box, Typography, Button, Paper } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { isAxiosError } from "axios";

interface logoutProps {
  open: boolean;
  onClose: () => void;
}

function Logout({ open, onClose }: logoutProps) {
  const navigate = useNavigate();
  if (!open) return null;

  const { isPending, mutate } = useMutation({
    mutationKey: ["logout-user"],
    mutationFn: async () => {
      const response = await axiosInstance.post("/api/auth/logout");
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Failed to logout.");
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/");
    },
  });

  function handleLogout() {
    mutate();
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
            loading={isPending}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Logout;
