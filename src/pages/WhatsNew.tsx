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
    title: "Version 2.0.1 Released",
    date: "2025-07-15",
    description: "Major UI overhaul, new dashboard layout, and user analytics.",
    icon: <IoSparklesSharp size={20} />,
  },
  {
    title: "Version 2.0 Released",
    date: "2025-06-15",
    description: "Dark mode enhancements, and faster sync.",
    icon: <IoSparklesSharp size={20} />,
  },
  {
    title: "Bug Fixes & Improvements",
    date: "2025-07-10",
    description: "Improved mobile responsiveness, and smoother transitions.",
    icon: <BsFillBugFill size={20} />,
  },
];

const roadmap = [
  {
    title: "Offline-first editing",
    target: "Q3 2025",
    status: "In progress",
    icon: <IoIosRocket size={20} />,
  },
  {
    title: "Voice input support",
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
        <Box mt={4}>
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
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Stack direction={"row"} alignItems="center" spacing={2}>
                      {item.icon}
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.date}
                        </Typography>
                        <Typography mt={1}>{item.description}</Typography>
                      </Box>
                    </Stack>
                    <Button
                      endIcon={<FiArrowUpRight />}
                      sx={{ height: "fit-content" }}
                    >
                      learn more
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ my: 4 }} />
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
                    justifyContent={"space-between"}
                  >
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                      {item.icon}
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Target: {item.target}
                        </Typography>
                      </Box>
                    </Stack>
                    <Chip
                      label={item.status}
                      variant="outlined"
                      color={item.status === "In progress" ? "info" : "warning"}
                      sx={{ mt: 1 }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default WhatsNew;
