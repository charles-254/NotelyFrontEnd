// src/pages/OAuthCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axios";
import { CircularProgress, Typography, Stack } from "@mui/material";

function OAuthCallback() {
  const navigate = useNavigate();
  console.log('Cookies:', document.cookie);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/me", { withCredentials: true });
        console.log(res.data)
        localStorage.setItem("user", JSON.stringify(res.data.userInfo));
        navigate("/home");
      } catch (error) {
        console.error("OAuth login failed", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  return (
    <Stack direction='row' spacing={'1rem'}>
        <CircularProgress size={50}/>
        <Typography>Logging in ...</Typography>
    </Stack>
  )
}

export default OAuthCallback;
