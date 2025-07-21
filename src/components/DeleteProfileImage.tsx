import { Box, Button, Stack, Typography, Alert } from "@mui/material";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { isAxiosError } from "axios";
import { useState } from "react";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

type UserSchema = {
  firstName: string | undefined;
  lastName: string | undefined;
  username: string | undefined;
  email: string | undefined;
  profileImageUrl: string | undefined | null;
};

const DeleteProfileImage = ({ open, onClose }: DeleteAccountModalProps) => {
  if (!open) return null;
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, _setUser] = useState<UserSchema>(userData);

  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-profile-image"],
    mutationFn: async (updatedUserInfo: UserSchema) => {
      const response = await axiosInstance.patch("/api/user", updatedUserInfo);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Failed to delete profile image.");
      }
    },
    onSuccess: () => {
      toast.success("Profile image deleted successfully.");
    },
  });

  function handleProfileImageDeletion() {
    const newUserinfo = { ...user, profileImageUrl: "" };
    localStorage.setItem("user", JSON.stringify(newUserinfo));
    mutate(newUserinfo);
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
            loading={isPending}
          >
            Delete profile image
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default DeleteProfileImage;
