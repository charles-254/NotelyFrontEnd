import {
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
  Stack,
} from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  const [language, setLanguage] = useState("en");
  const [autosaveInterval, setAutosaveInterval] = useState(30);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [markdownEnabled, setMarkdownEnabled] = useState(true);
  const [autoBullets, setAutoBullets] = useState(true);
  const [defaultView, setDefaultView] = useState("allNotes");

  return (
    <Stack>
      <Sidebar />
      <Box maxWidth="40rem" mx="auto" py={4} px={2}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Preferences
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Manage global application settings that affect your overall
          experience.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            label="Language"
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Autosave Interval (seconds)"
          type="number"
          value={autosaveInterval}
          onChange={(e) => setAutosaveInterval(Number(e.target.value))}
          sx={{ mb: 3, bgcolor: "inherit" }}
        />

        <FormGroup sx={{ mb: 3 }}>
          <FormControlLabel
            sx={{ width: "fit-content" }}
            control={
              <Switch
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
            }
            label="Enable Notifications"
          />
        </FormGroup>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>
          Editor Settings
        </Typography>

        <FormGroup>
          <Typography color="text.secondary" mb={".5rem"}>
            Switch between Markdown and plain text editing for flexible writing.
            Enable this to write using Markdown shortcuts like **bold** and #
            headings, or disable it for plain text editing.
          </Typography>
          <FormControlLabel
            sx={{ mb: "1.5rem", width: "fit-content" }}
            control={
              <Switch
                checked={markdownEnabled}
                onChange={() => setMarkdownEnabled(!markdownEnabled)}
              />
            }
            label="Enable Markdown"
          />
          <Typography color="text.secondary" mb={".5rem"}>
            Streamline your writing with automatic bullet list formatting. When
            enabled, starting a line with a dash or asterisk will instantly
            create a bullet point, and pressing Enter will continue the list for
            you
          </Typography>
          <FormControlLabel
            sx={{ width: "fit-content" }}
            control={
              <Switch
                checked={autoBullets}
                onChange={() => setAutoBullets(!autoBullets)}
              />
            }
            label="Auto Bullet Lists"
          />
        </FormGroup>

        <Divider sx={{ my: 2 }} />

        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>Default View on Startup</InputLabel>
          <Select
            value={defaultView}
            label="Default View on Startup"
            onChange={(e) => setDefaultView(e.target.value)}
          >
            <MenuItem value="allNotes">All Notes</MenuItem>
            <MenuItem value="favorites">Favorites</MenuItem>
            <MenuItem value="lastOpened">Last Opened</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default Settings;
