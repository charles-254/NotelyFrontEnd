import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { BsFillBugFill } from "react-icons/bs";
import { IoWarningSharp } from "react-icons/io5";

const ReportsAndViolationsCenter = () => {
  const [reportText, setReportText] = useState("");
  const [bugText, setBugText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [bugSubmitted, setBugSubmitted] = useState(false);

  const handleReportSubmit = () => {
    setSubmitted(true);
    setReportText("");
  };

  const handleBugSubmit = () => {
    setBugSubmitted(true);
    setBugText("");
  };

  const dummyReports = [
    {
      id: 1,
      title: "Abusive comment in shared note",
      date: "2025-07-15",
      status: "Under Review",
    },
    {
      id: 2,
      title: "Spam link in note collaboration",
      date: "2025-06-28",
      status: "Resolved",
    },
  ];

  const dummyBugs = [
    {
      id: 1,
      title: "Note editor crashes on paste",
      date: "2025-07-14",
      status: "Investigating",
    },
    {
      id: 2,
      title: "Dark mode flickers on load",
      date: "2025-07-10",
      status: "Fixed",
    },
  ];

  return (
    <Stack>
      <Sidebar />
      <Box width="800px" mx="auto" my={"3rem"}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Reports & Violations Center
        </Typography>

        <Typography variant="body1" mb={2}>
          Report abusive content or bugs. View submitted issues and track
          status.
        </Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Stack
              direction={"row"}
              spacing={"1rem"}
              mb={"1rem"}
              alignItems={"center"}
            >
              <IoWarningSharp size={25} style={{ color: "orange" }} />
              <Typography variant="h6" gutterBottom>
                Report Abusive or Inappropriate Content
              </Typography>
            </Stack>
            <TextField
              multiline
              fullWidth
              minRows={4}
              label="Describe the issue..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              variant="outlined"
            />
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={handleReportSubmit}
                disabled={!reportText.trim()}
                sx={{ borderRadius: ".3rem" }}
              >
                Submit Report
              </Button>
            </Box>
            {submitted && (
              <Typography mt={2} color="green">
                Violation report submitted. Thank you.
              </Typography>
            )}
          </CardContent>
        </Card>
        <Typography variant="h6" gutterBottom>
          Previous Violation Reports
        </Typography>
        <List>
          {dummyReports.map((report) => (
            <ListItem key={report.id} divider>
              <ListItemText
                primary={report.title}
                secondary={
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Typography variant="body2" color="text.secondary">
                      Date: {report.date} |
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status:
                    </Typography>
                    <Chip
                      size="small"
                      label={report.status}
                      color={report.status === "Resolved" ? "success" : "info"}
                    />
                  </Stack>
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 4 }} />
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Stack
              direction={"row"}
              spacing={"1rem"}
              alignItems={"center"}
              mb={"1rem"}
            >
              <BsFillBugFill size={25} />
              <Typography variant="h6">Report a Bug</Typography>
            </Stack>
            <TextField
              multiline
              fullWidth
              minRows={4}
              label="Describe the bug..."
              value={bugText}
              onChange={(e) => setBugText(e.target.value)}
              variant="outlined"
            />
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={handleBugSubmit}
                disabled={!bugText.trim()}
                sx={{ borderRadius: ".3rem" }}
              >
                Submit Bug
              </Button>
            </Box>
            {bugSubmitted && (
              <Typography mt={2} color="green">
                Bug report submitted. Thanks for helping us improve!
              </Typography>
            )}
          </CardContent>
        </Card>
        <Typography variant="h6" gutterBottom>
          Previous Bug Reports
        </Typography>
        <List>
          {dummyBugs.map((bug) => (
            <ListItem key={bug.id} divider>
              <ListItemText
                primary={bug.title}
                secondary={
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Typography variant="body2" color="text.secondary">
                      Date: {bug.date} |
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status:
                    </Typography>
                    <Chip
                      size="small"
                      label={bug.status}
                      color={bug.status === "Fixed" ? "success" : "info"}
                    />
                  </Stack>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Stack>
  );
};

export default ReportsAndViolationsCenter;
