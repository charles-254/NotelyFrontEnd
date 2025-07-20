import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

const DeleteAccount = ({ open, onClose }: DeleteAccountModalProps) => {
  const [confirmText, setConfirmText] = useState("");
  const confirmationText = "Please delete my account";
  if (!open) return null;

  function handleAccountDeletion() {
    toast.success("Account deleted.");
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
          Delete Account
        </Typography>
        <Alert
          variant="standard"
          severity="warning"
          sx={{ fontSize: "1rem", mb: ".5rem" }}
        >
          This action cannot be undone!
        </Alert>
        <Typography>
          Please type text below to proceed with deletion.
        </Typography>
        <Typography mb="1rem">
          <strong>
            <em>{confirmationText}</em>
          </strong>
        </Typography>
        <Stack spacing={2}>
          <TextField
            fullWidth
            variant="outlined"
            label={`Type ${confirmationText}`}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
          <Stack direction={"row"} gap={"1rem"}>
            <Button variant="outlined" fullWidth onClick={onClose}>
              {" "}
              Cancel
            </Button>
            <Button
              variant="contained"
              fullWidth
              color="error"
              disabled={confirmText !== confirmationText}
              onClick={handleAccountDeletion}
            >
              Delete My Account
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default DeleteAccount;
