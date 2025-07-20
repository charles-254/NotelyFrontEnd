import {
  Typography,
  Stack,
  Switch,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  Box,
  Divider,
} from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

function BetaTester() {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [features, setFeatures] = useState({
    aiSummaries: false,
    offlineEditing: false,
    smartNotifications: false,
    customThemes: false,
  });

  const handleFeatureToggle = (feature: keyof typeof features) => {
    setFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Sidebar />
      <Stack spacing={4} maxWidth={500} width="100%">
        <Typography variant="h4" fontWeight={700} textAlign="center">
          Be a Beta Tester
        </Typography>

        <Typography variant="body1" color="text.secondary" textAlign="center">
          Enroll in early access to try out upcoming features and help shape the
          future of our app.
        </Typography>

        <Card elevation={3}>
          <CardContent>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isEnrolled}
                    onChange={() => setIsEnrolled(!isEnrolled)}
                  />
                }
                label="Enroll in Beta Program"
              />

              <Divider />

              <Typography variant="subtitle1" fontWeight={600}>
                Experimental Features
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={features.aiSummaries}
                    onChange={() => handleFeatureToggle("aiSummaries")}
                    disabled={!isEnrolled}
                  />
                }
                label="AI-powered summaries"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={features.offlineEditing}
                    onChange={() => handleFeatureToggle("offlineEditing")}
                    disabled={!isEnrolled}
                  />
                }
                label="Offline-first editing"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={features.smartNotifications}
                    onChange={() => handleFeatureToggle("smartNotifications")}
                    disabled={!isEnrolled}
                  />
                }
                label="Smart notifications"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={features.customThemes}
                    onChange={() => handleFeatureToggle("customThemes")}
                    disabled={!isEnrolled}
                  />
                }
                label="Custom theme options"
              />
            </Stack>
          </CardContent>
        </Card>

        <Button
          variant="contained"
          size="large"
          disabled={!isEnrolled}
          sx={{ borderRadius: 0 }}
        >
          Save Preferences
        </Button>
      </Stack>
    </Box>
  );
}

export default BetaTester;
