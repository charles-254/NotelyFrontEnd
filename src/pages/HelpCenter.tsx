import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button,
  Stack,
  Alert,
  TextField,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../components/Sidebar";

function HelpCenter() {
  return (
    <Stack>
      <Sidebar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Help Center
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Find answers to common questions, troubleshoot issues, or reach out to
          our support team.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <TextField
          placeholder="Search help topics..."
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box>
          <Typography variant="h6" gutterBottom>
            Frequently Asked Questions
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I reset my password?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Go to{" "}
                <a href="/settings/account">Settings → Account Security</a> and
                click on "Change Password".
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                Where can I change my theme or appearance?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Visit{" "}
                <a href="/settings/appearance">Settings → Appearance & Theme</a>{" "}
                to customize your experience.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I backup my data?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Go to{" "}
                <a href="/settings/sync-backup">Settings → Sync & Backup</a> to
                configure automatic or manual backups.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I report a bug or issue?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Go to{" "}
                <a href="/settings/reports-violations">
                  Settings → Reports & Violations
                </a>{" "}
                or click below.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                href="/settings/reports-violations"
              >
                Report a Bug
              </Button>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Divider sx={{ my: 3 }} />
        <Box>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button variant="outlined" href="/settings/account">
              Reset Password
            </Button>
            <Button variant="outlined" href="/settings/appearance">
              Change Theme
            </Button>
            <Button variant="outlined" href="/settings/sync-backup">
              Backup Data
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />
        <Box>
          <Typography variant="h6" gutterBottom>
            Contact Support
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Still need help? Get in touch with our support team.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ContactSupportIcon />}
            sx={{ mt: 2 }}
            href="/contact-us"
          >
            Contact Support
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />
        <Box>
          <Typography variant="h6" gutterBottom>
            Troubleshooting Common Problems
          </Typography>
          <Stack spacing={1} mt={1}>
            <Alert severity="warning">
              App not syncing? Check your internet connection or relink your
              cloud storage.
            </Alert>
            <Alert severity="warning">
              Dark mode not applying? Refresh the app or re-select your theme in
              settings.
            </Alert>
            <Alert severity="warning">
              Page not found (404)? The link may be broken or the page has been
              moved.
            </Alert>
          </Stack>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Box textAlign="center">
          <Typography variant="body2" gutterBottom>
            Was this page helpful?
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Button variant="outlined" size="small">
              Yes
            </Button>
            <Button variant="outlined" size="small">
              No
            </Button>
          </Stack>
        </Box>
      </Container>
    </Stack>
  );
}

export default HelpCenter;
