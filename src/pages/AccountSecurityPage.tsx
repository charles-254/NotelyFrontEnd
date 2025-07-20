import {
  Box,
  Tabs,
  Tab,
  Typography,
  Container,
  TextField,
  Stack,
  Card,
  CardContent,
  Button,
  Avatar,
  Divider,
  InputAdornment,
  InputLabel,
  Paper,
} from "@mui/material";
import ChangePassword from "../components/ChangePassword";
import DeleteAccount from "../components/DeleteAccount";
import DeleteProfileImage from "../components/DeleteProfileImage";
import UploadProfileImage from "../components/UploadProfileImage";
import { useEffect, useState } from "react";
import { Person, Email } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoShieldHalfOutline } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { LuDot } from "react-icons/lu";
import { BsKeyFill } from "react-icons/bs";

type User = {
  firstName: string | undefined;
  lastName: string | undefined;
  username: string | undefined;
  email: string | undefined;
};

function TabPanel({ children, value, index }: any) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ mt: 3 }}>{children}</Box>}
    </div>
  );
}

function SettingsPage() {
  const [tab, setTab] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false); // get 2fa enabled value from db
  const [isGoogleConnected, setIsGoogleConnected] = useState(false); //get value from db
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const [showPasswordComp, setShowPasswordComp] = useState(false);
  const [showDeleteComp, setShowDeleteComp] = useState(false);
  const [showUploadProfileImageComp, setShowUploadProfileImageComp] =
    useState(false);
  const [showDeleteProfileImageComp, setShowDeleteProfileImageComp] =
    useState(false);

  const [user, setUser] = useState<User>({
    //use the persisted user oject here
    firstName: "Charles",
    lastName: "Mwangi",
    username: "darklight",
    email: "darklight@gmail.com",
  });

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName!);
      setLastName(user.lastName!);
      setUsername(user.username!);
      setEmail(user.email!);
    }
  }, [user]);

  const isChanged =
    firstName !== user.firstName ||
    lastName !== user.lastName ||
    username !== user.username ||
    email !== user.email;

  function handleUpdateUserDetails() {
    const updatedUserInfo = { firstName, lastName, username, email };
    setUser(updatedUserInfo);
    toast.success("Changes saved successfully.");
  }
  function handle2fa() {
    //update value into the db
    setTwoFAEnabled(!twoFAEnabled);
  }
  function handleGoogleConnect() {
    // i have no idea how to handle this yet
    setIsGoogleConnected(!isGoogleConnected);
  }
  function handleGithubConnect() {
    // i have no idea how to handle this
    setIsGithubConnected(!isGithubConnected);
  }

  return (
    <Container maxWidth="md" sx={{ mb: "6rem", mt: "4rem" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={tab} onChange={(_e, newValue) => setTab(newValue)}>
          <Tab label="User Settings" />
          <Tab label="Security Settings" />
        </Tabs>
      </Box>

      <TabPanel value={tab} index={0}>
        <Typography variant="h5" gutterBottom fontWeight={700}>
          User Settings
        </Typography>
        <Typography color="text.secondary" mb={2}>
          Manage your personal information and profile details.
        </Typography>

        <Divider sx={{ my: "2rem" }} />
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={3} alignItems="center">
              <Avatar
                src="/avatar.png"
                alt="User Avatar"
                sx={{ width: "7rem", height: "7rem" }}
              />
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Box>
                  <Typography variant="subtitle1">
                    Upload your profile image
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We support .png, .jpg, .jpeg.
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} mt={1}>
                  <Button
                    variant="outlined"
                    sx={{ borderRadius: ".3rem" }}
                    endIcon={<IoCloudUploadOutline />}
                    onClick={() => setShowUploadProfileImageComp(true)}
                  >
                    Upload Image
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<FaRegTrashAlt />}
                    onClick={() => setShowDeleteProfileImageComp(true)}
                    sx={{
                      bgcolor: "#c20000",
                      color: "#d1d0d0",
                      borderRadius: ".3rem",
                      "&:hover ": {
                        bgcolor: "#e00202",
                      },
                    }}
                  >
                    Delete Image
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Stack
          spacing={2}
          border={"1px solid rgb(47, 47, 47)"}
          p={"2rem"}
          borderRadius={".5rem"}
        >
          <Box display={"flex"} gap={"2rem"}>
            <Box width={"100%"}>
              <InputLabel sx={{ mb: ".5rem" }}>First Name</InputLabel>
              <TextField
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
            </Box>
            <Box width={"100%"}>
              <InputLabel sx={{ mb: ".5rem" }}>Last Name</InputLabel>
              <TextField
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
            </Box>
          </Box>
          <Box>
            <InputLabel sx={{ mb: ".3rem" }}>Username</InputLabel>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          </Box>
          <Box>
            <InputLabel sx={{ mb: ".5rem" }}>Email</InputLabel>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          </Box>
          <Button
            variant="outlined"
            size="large"
            disabled={!isChanged}
            onClick={handleUpdateUserDetails}
            sx={{ width: "fit-content", borderRadius: ".3rem", py: ".7rem" }}
          >
            Save Changes
          </Button>
        </Stack>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <Stack>
          <Typography variant="h5" gutterBottom fontWeight={700}>
            Security Settings
          </Typography>
          <Typography color="text.secondary" mb={"1.5rem"}>
            Set up multi-factor authentication and add third-party logins like
            GitHub or Google.
          </Typography>

          <Divider />
          <Stack component={"section"} mt={"2.5rem"}>
            <Typography variant="h5">Password And Authentication</Typography>
            <Typography color="text.secondary">
              Secure your account with password and two-factor authentication.
            </Typography>
            <Stack
              mt={"1.5rem"}
              spacing={2}
              border={"1px solid rgb(47, 47, 47)"}
              p={"1rem"}
              borderRadius={".5rem"}
            >
              <Paper
                sx={{
                  display: "flex",
                  px: ".7rem",
                  py: "1.2rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack direction={"row"} gap={"1.5rem"} alignItems={"center"}>
                  <BsKeyFill style={{ fontSize: "2rem" }} />

                  <Stack>
                    <Typography variant="subtitle1">
                      Account password
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Keep your account protected with frequent password
                      updates.
                    </Typography>
                  </Stack>
                </Stack>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  sx={{ borderRadius: ".3rem", my: ".5rem" }}
                  onClick={() => setShowPasswordComp(true)}
                >
                  Change Password
                </Button>
              </Paper>
              <Paper
                sx={{
                  display: "flex",
                  px: ".7rem",
                  py: "1.2rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack direction={"row"} gap={"1.5rem"} alignItems={"center"}>
                  <IoShieldHalfOutline style={{ fontSize: "2rem" }} />
                  <Stack>
                    <Stack direction={"row"} gap={".5rem"}>
                      <Typography variant="subtitle1" sx={{ display: "flex" }}>
                        Two-Factor Authentication
                      </Typography>
                      {twoFAEnabled ? (
                        <Stack direction={"row"} alignItems={"center"}>
                          <LuDot
                            style={{ fontSize: "2rem", color: "#16d085" }}
                          />
                          <Typography
                            variant="subtitle1"
                            color="primary.main"
                            fontWeight={600}
                          >
                            2FA is Active
                          </Typography>
                        </Stack>
                      ) : (
                        <Stack direction={"row"} alignItems={"center"}>
                          <LuDot style={{ fontSize: "2rem", color: "red" }} />
                          <Typography color="error" fontWeight={700}>
                            2FA is Inactive
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Two-Factor Authentication adds protection to your account.
                    </Typography>
                  </Stack>
                </Stack>
                {twoFAEnabled ? (
                  <Button
                    variant="contained"
                    onClick={handle2fa}
                    size="large"
                    sx={{
                      bgcolor: "#c20000",
                      color: "#d1d0d0",
                      my: ".5rem",
                      borderRadius: ".3rem",
                      "&:hover ": {
                        bgcolor: "#e00202",
                      },
                    }}
                  >
                    Disable 2FA
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handle2fa}
                    size="large"
                    sx={{ borderRadius: ".3rem", my: ".5rem" }}
                  >
                    Enable 2FA
                  </Button>
                )}
              </Paper>
            </Stack>
          </Stack>
          <Stack mt={"2rem"}>
            <Typography variant="h5">Linked Accounts</Typography>
            <Typography color="text.secondary">
              Link external accounts for faster and more secure logins.
            </Typography>

            <Stack
              mt={"1.5rem"}
              spacing={2}
              border={"1px solid rgb(47, 47, 47)"}
              p={"1rem"}
              borderRadius={".5rem"}
            >
              <Paper
                sx={{
                  display: "flex",
                  px: ".7rem",
                  py: "1.2rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack direction={"row"} gap={"1.5rem"} alignItems={"center"}>
                  <FaGoogle style={{ fontSize: "2rem" }} />
                  <Typography variant="subtitle1">
                    You can sign in using Google
                  </Typography>
                </Stack>
                {isGoogleConnected ? (
                  <Button
                    variant="outlined"
                    onClick={handleGoogleConnect}
                    size="large"
                    color="error"
                    sx={{
                      my: ".5rem",
                      borderRadius: ".3rem",
                    }}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleGoogleConnect}
                    size="large"
                    sx={{ borderRadius: ".3rem", my: ".5rem" }}
                  >
                    Connect
                  </Button>
                )}
              </Paper>

              <Paper
                sx={{
                  display: "flex",
                  px: ".7rem",
                  py: "1.2rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack direction={"row"} gap={"1.5rem"} alignItems={"center"}>
                  <IoLogoGithub style={{ fontSize: "2rem" }} />
                  <Typography variant="subtitle1">
                    You can sign in using Github
                  </Typography>
                </Stack>
                {isGithubConnected ? (
                  <Button
                    variant="outlined"
                    onClick={handleGithubConnect}
                    size="large"
                    color="error"
                    sx={{
                      my: ".5rem",
                      borderRadius: ".3rem",
                    }}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleGithubConnect}
                    size="large"
                    sx={{ borderRadius: ".3rem", my: ".5rem" }}
                  >
                    Connect
                  </Button>
                )}
              </Paper>
            </Stack>
          </Stack>
          <Stack mt={"2rem"}>
            <Typography variant="h5">Account Deletion</Typography>
            <Typography color="text.secondary">
              Account deletion is permanent. Your data cannot be recovered once
              this process is completed.
            </Typography>
            <Stack
              mt={"1.5rem"}
              spacing={2}
              border={"1px solid rgb(47, 47, 47)"}
              p={"1rem"}
              borderRadius={".5rem"}
            >
              <Paper
                sx={{
                  display: "flex",
                  px: ".7rem",
                  py: "1.2rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack direction={"row"} gap={"1.5rem"}>
                  <FaRegTrashAlt
                    style={{ fontSize: "2rem", color: "#c20000" }}
                  />
                  <Typography variant="subtitle1">
                    Permanently delete my account
                  </Typography>
                </Stack>
                <Button
                  size="large"
                  sx={{
                    bgcolor: "#c20000",
                    color: "#d1d0d0",
                    my: ".5rem",
                    borderRadius: ".3rem",
                    "&:hover ": {
                      bgcolor: "#e00202",
                    },
                  }}
                  onClick={() => setShowDeleteComp(true)}
                >
                  Delete account
                </Button>
              </Paper>
            </Stack>
          </Stack>
        </Stack>
      </TabPanel>

      {(showPasswordComp ||
        showDeleteComp ||
        showUploadProfileImageComp ||
        showDeleteProfileImageComp) && (
        <Box>
          <ChangePassword
            open={showPasswordComp}
            onClose={() => setShowPasswordComp(false)}
          />
          <DeleteAccount
            open={showDeleteComp}
            onClose={() => setShowDeleteComp(false)}
          />
          <DeleteProfileImage
            open={showDeleteProfileImageComp}
            onClose={() => setShowDeleteProfileImageComp(false)}
          />
          <UploadProfileImage
            open={showUploadProfileImageComp}
            onClose={() => setShowUploadProfileImageComp(false)}
          />
        </Box>
      )}
    </Container>
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

export default SettingsPage;
