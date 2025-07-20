import {
  Box,
  Typography,
  Switch,
  Button,
  Stack,
  Divider,
  FormControlLabel,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { FaDropbox, FaGoogleDrive } from "react-icons/fa";
import { MdOutlineBackup } from "react-icons/md";
import { MdOutlineRestore } from "react-icons/md";
import { IoMdSync } from "react-icons/io";

function SyncBackup() {
  const [autoBackup, setAutoBackup] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncHistory, setSyncHistory] = useState([
    { time: "2025-07-18 12:42", status: "Success" },
    { time: "2025-07-17 08:30", status: "Conflict detected" },
    { time: "2025-07-16 14:10", status: "Success" },
  ]);

  const handleSyncNow = () => {
    setSyncing(true);
    setTimeout(() => {
      const newEntry = {
        time: new Date().toISOString().slice(0, 16).replace("T", " "),
        status: "Success",
      };
      setSyncHistory([newEntry, ...syncHistory]);
      setSyncing(false);
    }, 1500);
  };

  return (
    <Stack justifyContent="center" alignItems="center" my={"3rem"}>
      <Box width="45rem">
        <Typography variant="h4" gutterBottom>
          Sync & Backup
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Link Cloud Storage</Typography>
        <Stack direction="row" spacing={2} mt={1} mb={3}>
          <Button
            variant="outlined"
            color="primary"
            endIcon={<FaGoogleDrive />}
          >
            Link Google Drive
          </Button>
          <Button variant="outlined" color="primary" endIcon={<FaDropbox />}>
            Link Dropbox
          </Button>
        </Stack>

        <FormControlLabel
          control={
            <Switch
              checked={autoBackup}
              onChange={(e) => setAutoBackup(e.target.checked)}
            />
          }
          label="Enable Auto Backup"
        />

        <Stack direction="row" spacing={2} mt={2} mb={4}>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<MdOutlineBackup />}
          >
            Backup Now
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            endIcon={<MdOutlineRestore />}
          >
            Restore from Backup
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={handleSyncNow}
            disabled={syncing}
            endIcon={<IoMdSync />}
          >
            {syncing ? "Syncing..." : "Sync Now"}
          </Button>
        </Stack>

        <Typography variant="h6" gutterBottom>
          Sync History
        </Typography>
        <Card variant="outlined">
          <CardContent>
            <List dense>
              {syncHistory.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.time}
                    secondary={item.status}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      color: item.status.includes("Conflict")
                        ? "error.main"
                        : "text.primary",
                    }}
                    secondaryTypographyProps={{
                      color: item.status.includes("Conflict")
                        ? "error.main"
                        : "text.secondary",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}

export default SyncBackup;
