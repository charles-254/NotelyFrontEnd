import { Box, Button, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import axiosInstance from "../apis/axios";
import { useMutation } from "@tanstack/react-query";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

interface User {
  firstName: string | undefined;
  lastName: string | undefined;
  username: string | undefined;
  email: string | undefined;
  profileImageUrl: string | null | undefined;
}
interface ProfileImage {
  profileImageUrl: string;
}

const UploadProfileImage = ({ open, onClose }: DeleteAccountModalProps) => {
  if (!open) return null;
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [user, _setUser] = useState<User>(userData);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  const uploadImage = async () => {
    setUploading(true);
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "blogimages");
    formData.append("cloud_name", "dofekmtxb");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dofekmtxb/image/upload",
        formData,
      );

      const uploadedImageUrl = response.data.secure_url;

      const newUserInfo = {
        ...user,
        profileImageUrl: uploadedImageUrl,
      };
      localStorage.setItem("user", JSON.stringify(newUserInfo));
      return uploadedImageUrl;
    } catch (err: any) {
      toast.error("Failed to upload image. Try again.");
    } finally {
      setUploading(false);
      onClose();
    }
  };
  const { isPending, mutate } = useMutation({
    mutationKey: ["update-profile-image"],
    mutationFn: async (profileImageUrl: ProfileImage) => {
      const response = await axiosInstance.patch("/api/user", profileImageUrl);
      console.log(response.data);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Failed to upload image. Try again.");
      }
    },
    onSuccess: () => {
      toast.success("Profile image uploaded successfully");
    },
  });

  const handleProfileImageUpload = async () => {
    const uploadedImageUrl = await uploadImage();
    const newUserInfo = { profileImageUrl: uploadedImageUrl };

    mutate(newUserInfo);

    onClose();
  };

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
          Upload Profile Image
        </Typography>
        <Stack>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
            />
          )}
        </Stack>

        <Stack direction={"row"} gap={"1rem"} mt={"1rem"}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={onClose}
          >
            {" "}
            Cancel
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleProfileImageUpload}
            loading={uploading || isPending}
          >
            Upload profile image
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default UploadProfileImage;
