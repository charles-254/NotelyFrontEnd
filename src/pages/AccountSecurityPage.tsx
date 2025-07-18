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
} from "@mui/material";
import { Person, Email } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

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
  const [user, setUser] = useState<User>({
    //use user oject here
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

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={tab} onChange={(_e, newValue) => setTab(newValue)}>
          <Tab label="User Settings" />
          <Tab label="Security Settings" />
        </Tabs>
      </Box>

      <TabPanel value={tab} index={0}>
        <Typography variant="h5" gutterBottom>
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
                  >
                    Upload Image
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<FaRegTrashAlt />}
                    sx={{
                      bgcolor: "#c20000",
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

        {/* Form */}
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
        <Typography variant="h5" gutterBottom>
          Security Settings
        </Typography>
        <Typography color="text.secondary" mb={2}>
          Update your password, 2FA, and connected devices.
        </Typography>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Change Password</Typography>
              <Stack spacing={2} mt={2}>
                <TextField label="Current Password" type="password" fullWidth />
                <TextField label="New Password" type="password" fullWidth />
                <TextField label="Confirm Password" type="password" fullWidth />
                <Button variant="contained" color="primary">
                  Update Password
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Divider />

          <Card>
            <CardContent>
              <Typography variant="subtitle1">
                Two-Factor Authentication (2FA)
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Protect your account by enabling 2FA.
              </Typography>
              <Button variant="outlined">Enable 2FA</Button>
            </CardContent>
          </Card>
        </Stack>
      </TabPanel>
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
