import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import z from "zod";
import { useState } from "react";
import {
  Mail,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
} from "@mui/icons-material";

const ContactUs = () => {
  const [message, setMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const contactFormSchema = z.object({
    fullName: z.string().min(1, "At least one name is required."),
    email: z.string().email("Invalid email address."),
    subject: z.string().min(3, "Subject is too short."),
    message: z.string().min(15, "Message is too short."),
  });

  async function handleSubmitMessage() {
    const contactData = { fullName, email, subject, message };
    const result = contactFormSchema.safeParse(contactData);

    if (!result.success) {
      const zodErrors: Record<string, string> = {};
      const fieldErrors: Record<string, string[]> =
        result.error.flatten().fieldErrors;
      for (const key in fieldErrors) {
        if (fieldErrors[key]?.[0]) {
          zodErrors[key] = fieldErrors[key][0];
        }
      }
      setFormErrors(zodErrors);
      return;
    }

    setFormErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("We will respond as soon as possible.");
    }, 1500);
  }

  return (
    <Stack direction="row">
      <Sidebar />
      <Box sx={{ py: 6, px: 2, width: "70rem", mx: "auto" }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Contact Us
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          We’d love to hear from you! Whether you have a question, feedback, or
          need help. Feel free to reach out.
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          <Paper elevation={3} sx={{ flex: 2, p: 3, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>
              Send us a message
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                fullWidth
                required
                error={!!formErrors.fullName}
                helperText={formErrors.fullName}
                sx={inputStyles}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" },
                }}
              />
              <TextField
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                fullWidth
                required
                error={!!formErrors.email}
                helperText={formErrors.email}
                sx={inputStyles}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" },
                }}
              />
              <TextField
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
                required
                error={!!formErrors.subject}
                helperText={formErrors.subject}
                sx={inputStyles}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" },
                }}
              />
              <TextField
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                rows={5}
                fullWidth
                required
                error={!!formErrors.message}
                helperText={formErrors.message}
                sx={inputStyles}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" },
                }}
              />
              <Button
                variant="contained"
                size="large"
                sx={{ mt: 2, borderRadius: 0 }}
                onClick={handleSubmitMessage}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Submit"}
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
                  <Typography>support@notely.com</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Phone color="primary" />
                  <Typography>+2547 0012 3456</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOn color="primary" />
                  <Typography>Nairobi, Kenya</Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2} mt={2}>
                <Facebook sx={{ cursor: "pointer" }} color="primary" />
                <Twitter sx={{ cursor: "pointer" }} color="primary" />
                <Instagram sx={{ cursor: "pointer" }} color="primary" />
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
        <Paper
          elevation={2}
          sx={{ p: 0, borderRadius: 3, overflow: "hidden", mt: 6 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.787251825411!2d36.82194661422657!3d-1.2920651359971706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d2f9897b6f%3A0xb6a0df8a45ff3b3d!2sNairobi%20CBD!5e0!3m2!1sen!2ske!4v1627024944396!5m2!1sen!2ske"
            width="100%"
            height="400"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </Paper>
      </Box>
    </Stack>
  );
};

export default ContactUs;

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
