import {
  Stack,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Link,
  Divider,
  Box,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
} from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import z from 'zod'
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

type User = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { mutate, isPending } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (userData: User) => {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/auth/register",
        userData,
      );
      console.log(response.data);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
    onSuccess: (data) => {
      toast.info(data.message);
    },
  });
   const registerSchema = z.object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    username: z.string().min(1, "Username is required."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

  function handleRegistration() {
    const userData = { firstName, lastName, username, email, password, confirmPassword };
     const result = registerSchema.safeParse(userData);
     if (!result.success) {
    const zodErrors: Record<string, string> = {};
    const fieldErrors: Record<string, string[]> = result.error.flatten().fieldErrors;

    for (const key in fieldErrors) {
      if (fieldErrors[key]?.[0]) {
        zodErrors[key] = fieldErrors[key][0];
      }
    }

    setFormErrors(zodErrors);
    return
  }
    setFormErrors({})
    const { confirmPassword: _, ...validUser } = result.data;
    mutate(validUser)
  }
  return (
    <Stack
      justifyContent={"center"}
      sx={{
        height: "100vh",
        backgroundImage: 'url("auth.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <Stack direction={"row"} my={3} mx={"5rem"}>
        <Stack
          width={"40%"}
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
            Let's get started
          </Typography>
          <Typography color="text.secondary" mt={2}>
            Welcome to Notely. Where clarity meets creativity. Our platform
            helps you collect, organize, and refine your ideas in one intuitive
            workspace. From quick thoughts to long-term goals, everything begins
            here.
          </Typography>
        </Stack>

        <Stack
          width={"60%"}
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
              Sign Up
            </Typography>
            <Stack spacing={2} direction={"row"}>
              <Box maxWidth={"50%"}>
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    ...inputStyles,
                    "& input:-webkit-autofill": {
                      ...inputStyles,
                      WebkitBoxShadow: "0 0 0 1000px transparent inset",
                      WebkitTextFillColor: "#fff",
                      transition: "background-color 5000s ease-in-out 0s",
                      caretColor: "#fff",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
                {formErrors.firstName && (
                  <Typography color="error">{formErrors.firstName}</Typography>
                )}
              </Box>
              <Box maxWidth={"50%"}>
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    ...inputStyles,
                    "& input:-webkit-autofill": {
                      ...inputStyles,
                      WebkitBoxShadow: "0 0 0 1000px transparent inset",
                      WebkitTextFillColor: "#fff",
                      transition: "background-color 5000s ease-in-out 0s",
                      caretColor: "#fff",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
                {formErrors.lastName && (
                  <Typography color="error">{formErrors.lastName}</Typography>
                )}
              </Box>
            </Stack>

            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                ...inputStyles,
                "& input:-webkit-autofill": {
                  ...inputStyles,
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  WebkitTextFillColor: "#fff",
                  transition: "background-color 5000s ease-in-out 0s",
                  caretColor: "#fff",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            {formErrors.username && (
              <Typography color="error">{formErrors.username}</Typography>
            )}

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                ...inputStyles,
                "& input:-webkit-autofill": {
                  ...inputStyles,
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  WebkitTextFillColor: "#fff",
                  transition: "background-color 5000s ease-in-out 0s",
                  caretColor: "#fff",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            {formErrors.email && (
              <Typography color="error">{formErrors.email}</Typography>
            )}

            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              autoComplete="new-password"
              sx={{
                ...inputStyles,
                "& input:-webkit-autofill": {
                  ...inputStyles,
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  WebkitTextFillColor: "#fff",
                  transition: "background-color 5000s ease-in-out 0s",
                  caretColor: "#fff",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {formErrors.password && (
              <Typography color="error">{formErrors.password}</Typography>
            )}
            

            <TextField
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              autoComplete="new-password"
              sx={{
                ...inputStyles,
                "& input:-webkit-autofill": {
                  ...inputStyles,
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  WebkitTextFillColor: "#fff",
                  transition: "background-color 5000s ease-in-out 0s",
                  caretColor: "#fff",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {formErrors.confirmPassword && (
                  <Typography color="error">{formErrors.confirmPassword}</Typography>
                )}
            <Button
              variant="contained"
              onClick={handleRegistration}
              loading={isPending}
              sx={{
                borderRadius: 0,
                mt: "2rem",
                fontSize: "1.3rem",
                fontWeight: 500,
              }}
            >
              Sign up
            </Button>

            <Typography textAlign={"center"}>
              Already a member ?{" "}
              <Link underline="hover" href="/login">
                Sign in here
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
            <IconButton sx={{ height: "fit-content", width: "fit-content" }}>
              <FcGoogle size={"2.5rem"} />
            </IconButton>
            <IconButton sx={{ height: "fit-content", width: "fit-content" }}>
              <IoLogoGithub size={"2.5rem"} />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
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
export default Register;
