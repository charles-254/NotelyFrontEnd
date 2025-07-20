import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import z from "zod";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}
// interface PasswordUpdate {
//   currentPassword: string;
//   newpassword: string;
// }

const ChangePassword = ({ open, onClose }: ChangePasswordModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleNewPassword = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmNewPassword = () =>
    setShowConfirmNewPassword((prev) => !prev);
  if (!open) return null;

  const changePasswordSchema = z
    .object({
      currentPassword: z.string().min(1, "Pease enter the current password."),
      newPassword: z.string().min(1, "Password must be at least 8 characters."),
      confirmNewPassword: z.string().min(1, "Please confirm your password."),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "Passwords do not match.",
      path: ["confirmNewPassword"],
    });

  function handleChangePassword() {
    const passwordData = { currentPassword, newPassword, confirmNewPassword };
    const result = changePasswordSchema.safeParse(passwordData);
    if (!result.success) {
      const zodErrors: Record<string, string> = {};
      const fieldErrors: Record<string, string[]> =
        result.error.flatten().fieldErrors;
      console.log(fieldErrors);

      for (const key in fieldErrors) {
        if (fieldErrors[key]?.[0]) {
          zodErrors[key] = fieldErrors[key][0];
        }
      }
      setFormErrors(zodErrors);
      return;
    }

    const { confirmNewPassword: _, ...passwords } = result.data;
    // mutate(passwords) send ppasswords to server using useMutation
    console.log(passwords);
    toast.success("password Changed successffully");
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
        <Typography variant="h6" mb={2}>
          Change Password
        </Typography>
        <Stack spacing={2}>
          <TextField
            required
            type={showPassword ? "text" : "password"}
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            error={!!formErrors.currentPassword}
            helperText={formErrors.currentPassword}
            sx={inputStyles}
            FormHelperTextProps={{
              sx: { fontSize: "1rem" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            required
            type={showNewPassword ? "text" : "password"}
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            sx={inputStyles}
            error={!!formErrors.newPassword}
            helperText={formErrors.newPassword}
            FormHelperTextProps={{
              sx: { fontSize: "1rem" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleNewPassword} edge="end">
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            required
            type={showConfirmNewPassword ? "text" : "password"}
            label="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            fullWidth
            error={!!formErrors.confirmNewPassword}
            helperText={formErrors.confirmNewPassword}
            sx={inputStyles}
            FormHelperTextProps={{
              sx: { fontSize: "1rem" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmNewPassword} edge="end">
                    {showConfirmNewPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" onClick={handleChangePassword}>
            Update Password
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ChangePassword;

const inputStyles = {
  backgroundColor: "transparent",
  borderRadius: 2,
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "primary.main",
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
    },
  },
};
