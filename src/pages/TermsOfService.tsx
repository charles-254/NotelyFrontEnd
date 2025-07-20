import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const TermsOfServicePage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Terms of Service
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1">
          By using this application, you agree to comply with and be legally
          bound by the terms and conditions outlined in this document. If you do
          not agree to these terms, please discontinue use.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          2. Use of the App
        </Typography>
        <Typography variant="body1">
          You may use this app for personal or organizational note-taking,
          collaboration, and backup. Misuse or abuse of the app, including
          unauthorized sharing, reverse engineering, or disruption, is
          prohibited.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          3. User Content
        </Typography>
        <Typography variant="body1">
          You retain ownership of the content you create. However, by uploading
          it, you grant us a limited license to host, store, and display it as
          needed to provide our service.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          4. Termination
        </Typography>
        <Typography variant="body1">
          We reserve the right to suspend or terminate your access to the app at
          any time for violations of these terms or misuse of the service.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          5. Changes to Terms
        </Typography>
        <Typography variant="body1">
          These Terms of Service may be updated from time to time. Changes will
          be communicated via the app or email, and your continued use signifies
          acceptance of the new terms.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Stack spacing={2} direction="column" alignItems="center">
        <Typography variant="h6" align="center">
          Need help or have questions?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ContactSupportIcon />}
          href="/contact-us"
        >
          Contact Support
        </Button>
      </Stack>
    </Container>
  );
};

export default TermsOfServicePage;
