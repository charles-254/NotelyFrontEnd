import {
  Stack,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Link,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
} from "@mui/icons-material";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
              <TextField
                label="First Name"
                fullWidth
                variant="outlined"
                sx={inputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                sx={inputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              sx={inputStyles}
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
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              autoComplete="new-password"
              sx={inputStyles}
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

            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              autoComplete="new-password"
              sx={inputStyles}
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
            <Button
              variant="contained"
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
