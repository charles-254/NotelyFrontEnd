import { Box, Button, Stack, Typography, Alert } from "@mui/material";
import { toast } from "react-toastify";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

const DeleteProfileImage = ({ open, onClose }: DeleteAccountModalProps) => {
  if (!open) return null;

  function handleProfileImageDeletion() {
    // handle removing profile image from db ... set profile url to empty
    toast.success("Profile image removed successfully.");
    onClose();
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
      onClick={onClose}
    >
      <Box
        sx={{
          backgroundColor: "#121212",
          padding: "2rem",
          borderRadius: ".5rem",
          minWidth: "350px",
          width: "90%",
          maxWidth: "500px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="h5" mb={2}>
          Delete Profile Image
        </Typography>

        <Alert severity="warning" variant="standard">
          This action will remove your profile image!
        </Alert>

        <Stack direction={"row"} gap={"1rem"} mt={".5rem"}>
          <Button variant="outlined" fullWidth onClick={onClose}>
            {" "}
            Cancel
          </Button>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            onClick={handleProfileImageDeletion}
          >
            Delete profile image
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default DeleteProfileImage;
