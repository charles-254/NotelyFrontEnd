import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import { IoSparklesSharp } from "react-icons/io5";
import { BsFillBugFill } from "react-icons/bs";
import { IoIosRocket } from "react-icons/io";
import { FiArrowUpRight } from "react-icons/fi";

const changelog = [
  {
    title: "Version 1.1.0 Released",
    date: "2025-07-15",
    description: "Major UI overhaul, new dashboard layout, and user analytics.",
    icon: <IoSparklesSharp size={20} />,
    tags: ["Feature", "UI"],
  },
  {
    title: "Version 1.0.0 Released",
    date: "2025-06-15",
    description: "Dark mode enhancements, and faster sync.",
    icon: <IoSparklesSharp size={20} />,
    tags: ["Enhancement"],
  },
  {
    title: "Bug Fixes & Improvements",
    date: "2025-07-10",
    description: "Improved mobile responsiveness, and smoother transitions.",
    icon: <BsFillBugFill size={20} />,
    tags: ["Fix", "Performance"],
  },
];

const roadmap = [
  {
    title: "Offline-first editing",
    version: "v1.2.0",
    target: "Q3 2025",
    status: "In progress",
    icon: <IoIosRocket size={20} />,
  },
  {
    title: "Voice input support",
    version: "v1.3.0",
    target: "Q4 2025",
    status: "Planned",
    icon: <IoIosRocket size={20} />,
  },
];

const WhatsNew = () => {
  return (
    <Stack>
      <Sidebar />
      <Box p={4} maxWidth="800px" mx="auto">
        <Typography variant="h4" fontWeight={600} gutterBottom>
          What’s New
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="right"
          mb={4}
        >
          Last updated: July 20, 2025
        </Typography>

        <Box>
          <Typography variant="h6" gutterBottom>
            Changelog
          </Typography>
          <Stack spacing={2}>
            {changelog.map((item, index) => (
              <Card key={index} variant="outlined">
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      {item.icon}
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.date}
                        </Typography>
                        <Typography mt={1}>{item.description}</Typography>
                        <Stack direction="row" spacing={1} mt={1}>
                          {item.tags?.map((tag, idx) => (
                            <Chip
                              key={idx}
                              label={tag}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Stack>
                      </Box>
                    </Stack>
                    <Button
                      endIcon={<FiArrowUpRight />}
                      sx={{ height: "fit-content" }}
                    >
                      Learn More
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ my: 6 }}>
          <Chip label="Coming Soon" />
        </Divider>

        <Box>
          <Typography variant="h6" gutterBottom>
            Roadmap Previews
          </Typography>
          <Stack spacing={2}>
            {roadmap.map((item, index) => (
              <Card key={index} variant="outlined">
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      {item.icon}
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Target: {item.target}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Version: {item.version}
                        </Typography>
                      </Box>
                    </Stack>
                    <Chip
                      label={item.status}
                      variant="outlined"
                      color={item.status === "In progress" ? "info" : "warning"}
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ my: 6 }}>
          <Chip label="Feedback" />
        </Divider>

        <Box>
          <Typography variant="h6" gutterBottom>
            Found a bug ?
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Help us improve Notely by reporting issues or suggesting features.
          </Typography>
          <Button
            variant="outlined"
            href="/settings/reports-violations"
            target="_blank"
            sx={{ borderRadius: ".3rem" }}
          >
            report bug
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default WhatsNew;
