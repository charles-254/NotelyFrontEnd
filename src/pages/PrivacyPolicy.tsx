import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Link,
  Stack,
} from "@mui/material";
import {} from "react-icons/bs";
import { BsPersonFillLock } from "react-icons/bs";
import Sidebar from "../components/Sidebar";

function PrivacyPolicy() {
  return (
    <Stack>
      <Sidebar />
      <Box p={{ xs: 2, sm: 4 }} maxWidth="800px" mx="auto">
        <Typography variant="h4" gutterBottom alignItems={"center"}>
          <Typography component={"span"}>
            <BsPersonFillLock size={40} style={{ color: "orange" }} />
          </Typography>{" "}
          Your Privacy Rights
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          Your personal information is important to us. We are committed to
          protecting your data in accordance with global privacy regulations,
          including the General Data Protection Regulation (GDPR), California
          Consumer Privacy Act (CCPA), and other applicable laws.
        </Typography>
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Global Data Privacy Compliance
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Under global data protection frameworks, you have the following
              rights:
            </Typography>

            <List dense>
              <ListItem>
                <ListItemText primary="✔️ Right to be informed about how your data is collected and used" />
              </ListItem>
              <ListItem>
                <ListItemText primary="✔️ Right to access your personal data" />
              </ListItem>
              <ListItem>
                <ListItemText primary="✔️ Right to correct inaccurate or incomplete data" />
              </ListItem>
              <ListItem>
                <ListItemText primary="✔️ Right to request deletion of your data ('right to be forgotten')" />
              </ListItem>
              <ListItem>
                <ListItemText primary="✔️ Right to restrict or object to processing" />
              </ListItem>
              <ListItem>
                <ListItemText primary="✔️ Right to data portability" />
              </ListItem>
              <ListItem>
                <ListItemText primary="✔️ Right to withdraw consent at any time" />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Full Privacy Policy
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
              1. Information We Collect
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              We collect personal data you provide directly (e.g., name, email),
              and usage data (e.g., device information, interactions, IP
              address) through analytics and cookies.
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              2. How We Use Your Data
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              - To provide and personalize our services - To respond to your
              support requests - To analyze trends and improve performance - To
              comply with legal obligations
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              3. Cookies and Tracking
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              We use cookies and similar technologies to enhance your
              experience, remember preferences, and measure usage. You can
              manage cookie preferences in your browser settings.
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              4. Data Retention
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              We retain personal data only as long as necessary for the purposes
              described in this policy, or as required by law. You can request
              early deletion at any time.
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              5. Data Security
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              We use secure encryption, strict access controls, and regular
              audits to protect your data from unauthorized access or misuse.
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              6. Your Rights & Control
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              You can access, update, delete, or export your personal data by
              contacting us. We will respond to all legitimate requests within a
              reasonable time.
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              7. Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              For any privacy concerns, contact our Data Protection Officer at:{" "}
              <Typography component={"span"} color="info">
                <strong>privacy@notely.com</strong>
              </Typography>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Read the full detailed policy:{" "}
              <Link href="#" color="info">
                View Full Privacy Policy
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}

export default PrivacyPolicy;
