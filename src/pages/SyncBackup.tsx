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
  Chip,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaDropbox, FaGoogleDrive } from "react-icons/fa";
import { MdOutlineBackup, MdOutlineRestore } from "react-icons/md";
import { IoMdSync } from "react-icons/io";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";

function SyncBackup() {
  const [autoBackup, setAutoBackup] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [backupFrequency, setBackupFrequency] = useState("Daily");

  const [syncHistory, setSyncHistory] = useState([
    { time: "2025-07-18 12:42", status: "Success" },
    { time: "2025-07-17 08:30", status: "Failed" },
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
      toast.success("Sync completed successfully!");
    }, 1500);
  };

  return (
    <Stack direction={"row"}>
      <Sidebar />
      <Stack
        justifyContent="center"
        alignItems="center"
        my={"3rem"}
        mx={"auto"}
      >
        <Box width="45rem">
          <Typography
            variant="h4"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CloudUploadIcon sx={{ mr: 1 }} />
            Sync & Backup
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Last Backup: {syncHistory[0]?.time ?? "Not available"}
          </Typography>

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

          <Stack>
            <FormControlLabel
              control={
                <Switch
                  checked={autoBackup}
                  onChange={(e) => setAutoBackup(e.target.checked)}
                />
              }
              label="Enable Auto Backup"
            />

            <FormControl sx={{ mt: 2, mb: 3, maxWidth: 200 }} size="small">
              <InputLabel>Backup Frequency</InputLabel>
              <Select
                value={backupFrequency}
                label="Backup Frequency"
                onChange={(e) => setBackupFrequency(e.target.value)}
              >
                <MenuItem value="On Change">On Change</MenuItem>
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={2} mt={1} mb={4}>
            <Button variant="contained" endIcon={<MdOutlineBackup />}>
              Backup Now
            </Button>
            <Button variant="outlined" endIcon={<MdOutlineRestore />}>
              Restore from Backup
            </Button>
            <Button
              variant="outlined"
              color="info"
              onClick={handleSyncNow}
              disabled={syncing}
              endIcon={syncing ? <CircularProgress size={18} /> : <IoMdSync />}
            >
              {syncing ? "Syncing..." : "Sync Now"}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<DownloadIcon />}
            >
              Export Notes
            </Button>
          </Stack>

          <Stack direction={"row"} gap={"1rem"} mb={"1rem"}>
            <Typography variant="h6">Sync History</Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setSyncHistory([])}
            >
              Clear history
            </Button>
          </Stack>
          <Card variant="outlined">
            <CardContent>
              <List dense>
                {syncHistory.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item.time}
                      primaryTypographyProps={{
                        fontWeight: 500,
                      }}
                    />
                    <Chip
                      label={item.status}
                      color={item.status == "Failed" ? "error" : "success"}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Stack>
  );
}

export default SyncBackup;
