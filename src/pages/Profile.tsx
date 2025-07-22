import {
  Stack,
  Typography,
  Avatar,
  Box,
  Chip,
  Button,
  Tab,
  Tabs,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Pins from "../components/Pins";
import ReadLaters from "../components/ReadLaters";
import Saves from "../components/Saves";
import UserNotes from "../components/UserNotes";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Profile() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack direction={"row"}>
      <Sidebar />
      <Stack width={"100%"}>
        <Stack mt={"2rem"} mx={"auto"} width={"100%"} py={"1rem"}>
          <Stack direction={"row"} justifyContent={"space-between"} px={"3rem"}>
            <Stack direction={"row"} gap={"1.5rem"}>
              {userData.profileImageUrl ? (
                <Avatar
                  src={userData.profileImageUrl}
                  sx={{ width: "8.5rem", height: "8.5rem" }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: "8.5rem",
                    height: "8.5rem",
                    fontSize: "3rem",
                    fontWeight: 600,
                  }}
                >
                  {" "}
                  {userData.firstName[0].toUpperCase()}
                  {userData.lastName[0].toUpperCase()}
                </Avatar>
              )}

              <Stack>
                <Typography
                  variant="h3"
                  textTransform={"capitalize"}
                  fontWeight={600}
                >
                  {userData.firstName} {userData.lastName}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  @{userData.username}
                </Typography>
                <Box display={"flex"} gap={"1rem"}>
                  <Chip variant="outlined" label="13 following" />
                  <Chip variant="outlined" label="13 followers" />
                </Box>
              </Stack>
            </Stack>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ height: "fit-content" }}
              size="large"
            >
              {" "}
              Edit Profile
            </Button>
          </Stack>
        </Stack>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              justifyItems: "center",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Notes Categories"
            >
              <Tab label="Pins" {...a11yProps(0)} sx={{ fontWeight: 600 }} />
              <Tab
                label="Read Later"
                {...a11yProps(1)}
                sx={{ fontWeight: 600 }}
              />
              <Tab label="Saves" {...a11yProps(2)} sx={{ fontWeight: 600 }} />
              <Tab
                label="Your Notes"
                {...a11yProps(3)}
                sx={{ fontWeight: 600 }}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Pins />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ReadLaters />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Saves />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <UserNotes />
          </CustomTabPanel>
        </Box>
      </Stack>
    </Stack>
  );
}

export default Profile;
