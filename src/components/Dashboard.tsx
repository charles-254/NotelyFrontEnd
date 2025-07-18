import { Stack, Typography } from "@mui/material";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <Stack direction={"row"}>
      <Sidebar />
      <Stack bgcolor={"red"}>
        <Typography variant="h3">hello there</Typography>
      </Stack>
    </Stack>
  );
}

export default Dashboard;
