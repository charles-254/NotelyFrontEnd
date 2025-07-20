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
import { toast } from "react-toastify";
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

  function handlePreferencesUpdate() {
    toast.success("Preferences saved successfully.");
  }

  return (
    <Stack direction="row" minHeight="100vh">
      <Sidebar />
      <Box
        component="main"
        flex={1}
        p={4}
        maxWidth="800px"
        mx="auto"
        display="flex"
        flexDirection="column"
        gap={4}
        overflow="auto"
      >
        <Typography variant="h4" fontWeight={700} textAlign="center">
          Be a Beta Tester
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          maxWidth="600px"
          mx="auto"
        >
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

              {[
                { label: "AI-powered summaries", key: "aiSummaries" },
                { label: "Offline-first editing", key: "offlineEditing" },
                { label: "Smart notifications", key: "smartNotifications" },
                { label: "Custom theme options", key: "customThemes" },
              ].map(({ label, key }) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Switch
                      checked={features[key as keyof typeof features]}
                      onChange={() =>
                        handleFeatureToggle(key as keyof typeof features)
                      }
                      disabled={!isEnrolled}
                    />
                  }
                  label={label}
                />
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card elevation={1}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              What’s Expected of Beta Testers
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={2}>
              As a beta tester, you’re part of an exclusive group helping shape
              our future features. Here’s how to contribute:
            </Typography>

            <Stack spacing={1} pl={2}>
              <Typography variant="body2">
                • <strong>Explore:</strong> Use new features in your regular
                workflow.
              </Typography>
              <Typography variant="body2">
                • <strong>Report bugs:</strong> Describe the issue and how to
                reproduce it. Use{" "}
                <code>Settings → Help Center → Reports & violations </code>.
              </Typography>
              <Typography variant="body2">
                • <strong>Give feedback:</strong> Share your thoughts on
                usability and performance.
              </Typography>
              <Typography variant="body2">
                • <strong>Be constructive:</strong> Respect the process and
                other testers.
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              fontStyle="italic"
              color="text.secondary"
              mt={2}
            >
              Your input directly influences future development. Thank you!
            </Typography>
          </CardContent>
        </Card>

        <Box textAlign="center">
          <Button
            variant="contained"
            size="large"
            sx={{ borderRadius: 0, minWidth: "20rem" }}
            onClick={handlePreferencesUpdate}
          >
            Save Preferences
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}

export default BetaTester;
