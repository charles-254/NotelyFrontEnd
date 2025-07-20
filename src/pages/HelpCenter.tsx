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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
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
                Go to Settings &gt; Account Security and click on "Change
                Password".
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
                Visit Settings &gt; Appearance & Theme to customize your
                experience.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I backup my data?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Go to Settings &gt; Sync & Backup to configure automatic or
                manual backups.
              </Typography>
            </AccordionDetails>
          </Accordion>
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
              Cannot log in? Make sure your credentials are correct or reset
              your password.
            </Alert>
          </Stack>
        </Box>
      </Container>
    </Stack>
  );
}

export default HelpCenter;
