import {
  Stack,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Link,
  Divider,
  FormControlLabel,
  Checkbox,
  Paper,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import axios from "axios";
import z from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

type UserCreds = {
  identifier: string;
  password: string;
  rememberMe: boolean;
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotForm, setShowForgotForm] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const loginSchema = z.object({
    identifier: z.string().min(1, "Username OR Email is required."),
    password: z.string().min(1, "Password is required."),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (userCreds: UserCreds) => {
      const response = await axiosInstance.post("/api/auth/login", userCreds);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.userInfo));
      toast.success("Authenticated successfully.");
      navigate("/home");
    },
  });
 

  function handleLogin() {
    const userData = { identifier, password };
    const result = loginSchema.safeParse(userData);
    if (!result.success) {
      const zodErrors: Record<string, string> = {};
      const fieldErrors: Record<string, string[]> =
        result.error.flatten().fieldErrors;

      for (const key in fieldErrors) {
        if (fieldErrors[key]?.[0]) {
          zodErrors[key] = fieldErrors[key][0];
        }
      }

      setFormErrors(zodErrors);
      return;
    }
    setFormErrors({});
    const validUserData = { ...result.data, rememberMe };
    mutate(validUserData);
  }

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("If your email is registered, a reset link has been sent.");
    // forgot password logic
    setTimeout(() => {
      setShowForgotForm(false);
    }, 4000);
  };

  return (
    <Stack
      justifyContent={"center"}
      sx={{
        height: "100vh",
        backgroundImage: 'url("auth.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }} my={3} mx={"10rem"}>
        <Stack
          width={{ xs: "100%", md: "40%" }}
          px={6}
          justifyContent={"center"}
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h3"
            color="primary"
            textTransform={"capitalize"}
            fontFamily={'"Noto Serif", serif'}
            fontWeight={900}
          >
            Welcome back
          </Typography>
          <Typography color="text.secondary" mt={2}>
            Glad to have you again. Pick up where you left off and let Notely
            help you organize your thoughts, plans, and reflections, all in one
            place.
          </Typography>
        </Stack>
        <Stack
          width={{ xs: "100%", md: "60%" }}
          spacing={3}
          px={5}
          bgcolor={"rgba(0, 0, 0, 0.83)"}
          direction={"row"}
          sx={{ backdropFilter: "blur(6px)" }}
        >
          <Stack width={"100%"} gap={2} p={"2rem"}>
            <Typography
              variant="h3"
              textTransform={"capitalize"}
              fontFamily={'"Noto Serif", serif'}
              fontWeight={600}
              gutterBottom
            >
              Sign In
            </Typography>
            <TextField
              label="Email OR Username"
              value={identifier}
              onChange={(e) => {
                formErrors.identifier = "";
                setIdentifier(e.target.value);
              }}
              fullWidth
              variant="outlined"
              sx={inputStyles}
              error={!!formErrors.identifier}
              helperText={formErrors.identifier}
              FormHelperTextProps={{
                sx: { fontSize: ".85rem" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              value={password}
              onChange={(e) => {
                formErrors.password = "";
                setPassword(e.target.value);
              }}
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              autoComplete="current-password"
              error={!!formErrors.password}
              helperText={formErrors.password}
              sx={inputStyles}
              FormHelperTextProps={{
                sx: { fontSize: ".85rem" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={"1.5rem"}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Remember Me"
              />
              <Link
                underline="hover"
                onClick={() => setShowForgotForm(true)}
                sx={{ mt: 2, cursor: "pointer" }}
              >
                Forgot password?
              </Link>
            </Stack>
            <Button
              variant="contained"
              onClick={handleLogin}
              loading={isPending}
              sx={{
                borderRadius: 0,
                fontSize: "1.3rem",
                fontWeight: 500,
              }}
            >
              Sign In
            </Button>

            <Typography textAlign={"center"}>
              Not a Notely member ?{" "}
              <Link underline="hover" href="/register">
                Register here
              </Link>
            </Typography>
          </Stack>
          <Divider
            orientation="vertical"
            variant="middle"
            sx={{ height: "80%", alignSelf: "center" }}
          >
            <Typography my={3}>OR</Typography>
          </Divider>

          <Stack justifyContent={"center"} gap={4}>
            <Typography textAlign={"center"}>Continue with</Typography>
            <IconButton sx={{ height: "fit-content", width: "fit-content" }} >
              <FcGoogle size={"2.5rem"} />
            </IconButton>
            <IconButton sx={{ height: "fit-content", width: "fit-content" }}>
              <IoLogoGithub size={"2.5rem"} />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
      {showForgotForm && (
        <Stack
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          zIndex={10}
          onClick={() => setShowForgotForm(false)}
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Paper
            sx={{
              p: 4,
              width: "90%",
              maxWidth: 480,
              bgcolor: "background.paper",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {feedback && <Alert severity="info">{feedback}</Alert>}
            <Typography variant="h5" gutterBottom>
              Forgot Password
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Enter your registered email and we'll send you a reset link.
            </Typography>
            <form onSubmit={handleForgotSubmit}>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
                variant="outlined"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={() => setShowForgotForm(false)}
                  variant="outlined"
                  color="secondary"
                  fullWidth
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" fullWidth>
                  Send Link
                </Button>
              </Stack>
            </form>
          </Paper>
        </Stack>
      )}
    </Stack>
  );
}

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

export default Login;
