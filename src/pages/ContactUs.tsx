import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { Mail, Phone, LocationOn } from "@mui/icons-material";

const ContactUs = () => {
  return (
    <Box
      sx={{
        py: 6,
        px: 2,
        maxWidth: 1000,
        mx: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Contact Us
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        We’d love to hear from you! Whether you have a question, feedback, or
        need help — feel free to reach out.
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        <Paper
          elevation={3}
          sx={{
            flex: 2,
            p: 3,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" mb={2}>
            Send us a message
          </Typography>
          <Stack spacing={2}>
            <TextField label="Full Name" fullWidth required />
            <TextField label="Email Address" type="email" fullWidth required />
            <TextField label="Subject" fullWidth />
            <TextField label="Message" multiline rows={5} fullWidth required />
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, borderRadius: 0 }}
            >
              Submit
            </Button>
          </Stack>
        </Paper>
        <Box flex={1} display="flex" flexDirection="column" gap={3}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Contact Information
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Mail color="primary" />
                <Typography>Email: support@example.com</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Phone color="primary" />
                <Typography>Phone: +254 700 123 456</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOn color="primary" />
                <Typography>Address: Nairobi, Kenya</Typography>
              </Stack>
            </Stack>
          </Paper>

          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Business Hours
            </Typography>
            <Typography>Monday - Friday: 9:00 AM to 6:00 PM</Typography>
            <Typography>Saturday - Sunday: Closed</Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default ContactUs;
