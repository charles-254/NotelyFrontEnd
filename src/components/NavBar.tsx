import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Link,
  Avatar, Box
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";

function Navbar() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const profileImageUrl = true;

  if (userData) {
    return (
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "background.default" }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: "95%",
            alignSelf: "center",
            my: ".3rem",
          }}
        >
          <Typography variant="h4" color="primary" fontWeight={600}>
            <Box component={'img'} src="/logo.png"/>
            Notely
          </Typography>
          <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
            <Link variant="h6" href="/profile" fontSize={"1.1rem"}>
              My Notes
            </Link>
            <Link variant="h6" href="/notes/create" fontSize={"1.1rem"}>
              New Entry
            </Link>
            <Link variant="h6" href="/trash" fontSize={"1.1rem"}>
              Trash
            </Link>
            <Link variant="h6" href="/profile" fontSize={"1.1rem"}>
              Profile
            </Link>

            <Typography variant="h6">
              Welcome <Link href="/user/account">username</Link>
            </Typography>
            {profileImageUrl ? (
              <Avatar sx={{ height: 50, width: 50 }}>
                {" "}
                <img src={"profileImageUrl"} alt="" width={80} />
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  fontSize: "2.2rem",
                  color: "white",
                }}
              >
                DA
              </Avatar>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "Background.default" }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: "90%",
            alignSelf: "center",
          }}
        >
          <Typography variant="h4" color="primary" fontWeight={600}>
            Notely
          </Typography>
          <Stack direction="row" spacing={3}>
            <Button
              href="/login"
              variant="outlined"
              sx={{
                fontSize: "1.3rem",
                fontWeight: 500,
              }}
            >
              SignIn
            </Button>
            <Button
              href="/register"
              variant="contained"
              color="secondary"
              size="small"
              sx={{
                fontSize: "1.3rem",
                fontWeight: 500,
              }}
            >
              SignUp
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
