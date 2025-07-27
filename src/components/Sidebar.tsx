import {
  Drawer,
  List,
  Tooltip,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  ListItemButton,
  Stack,
  Typography,
  Badge,
  Avatar,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logout from "./Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import { FaPowerOff } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { IoOpenOutline } from "react-icons/io5";
import { MdContactSupport } from "react-icons/md";

const drawerWidth = 160;

function Sidebar() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showLogoutComp, setShowLogoutComp] = useState(false);
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved === null ? true : JSON.parse(saved);
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(open));
  }, [open]);

  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();
  return (
    <Stack direction={"row"}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 60,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"center"}
          spacing={"1rem"}
          alignItems={"center"}
          my=".5rem"
        >
          {open && (
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Stack component={"img"} src="/logo.png" width={"2.5rem"} />
              <Typography
                fontSize={"1.1rem"}
                fontWeight={700}
                color="primary.main"
              >
                Notely
              </Typography>
            </Stack>
          )}
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              width: "fit-content",
              height: "fit content",
              alignSelf: "center",
            }}
          >
            {open ? (
              <MdKeyboardArrowLeft />
            ) : (
              <Box
                width={"100%"}
                height={"100%"}
                sx={{
                  position: "relative",
                  display: "inline-block",
                  "&:hover .hover-icon": {
                    opacity: 1,
                  },
                  "&:hover .logo-img": {
                    opacity: 0,
                  },
                }}
              >
                <Stack
                  component="img"
                  src="/logo.png"
                  width="2.5rem"
                  className="logo-img"
                  sx={{
                    transition: "opacity 0.2s ease-in-out",
                  }}
                />
                <Box
                  className="hover-icon"
                  height={"100%"}
                  width={"100%"}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    opacity: 0,
                    alignContent: "center",
                  }}
                >
                  <MdKeyboardArrowRight style={{ fontSize: "2.3rem" }} />
                </Box>
              </Box>
            )}
          </IconButton>
        </Stack>

        <Divider />

        <Stack
          sx={{
            height: "100vh",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            pb: "1rem",
            color: "#d3d3d3",
          }}
        >
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            component="nav"
          >
            {open ? (
              <ListItemButton
                selected={currentPath === "/home"}
                onClick={() => navigate("/home")}
              >
                <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            ) : (
              <Tooltip
                title="Home"
                placement="right"
                componentsProps={styling}
                sx={{ mb: ".5rem" }}
              >
                <ListItemButton
                  selected={currentPath === "/home"}
                  onClick={() => navigate("/home")}
                >
                  <ListItemIcon>
                    <HomeIcon style={{ fontSize: "1.5rem" }} />
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            )}

            {open ? (
              <ListItemButton
                selected={currentPath === "/profile"}
                onClick={() => navigate("/profile")}
              >
                <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                  <FaUser />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            ) : (
              <Tooltip
                title="Profile"
                placement="right"
                componentsProps={styling}
                sx={{ mb: ".5rem" }}
              >
                <ListItemButton
                  selected={currentPath === "/profile"}
                  onClick={() => navigate("/profile")}
                >
                  <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                    <FaUser style={{ fontSize: "1.3rem" }} />
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            )}

            {open ? (
              <ListItemButton
                selected={currentPath === "/notes/create"}
                onClick={() => navigate("/notes/create")}
              >
                <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                  <FaPlus />
                </ListItemIcon>
                <ListItemText primary="Create" />
              </ListItemButton>
            ) : (
              <Tooltip
                title="Create"
                placement="right"
                componentsProps={styling}
                sx={{ mb: ".5rem" }}
              >
                <ListItemButton
                  selected={currentPath === "/notes/create"}
                  onClick={() => navigate("/notes/create")}
                >
                  <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                    <FaPlus style={{ fontSize: "1.3rem" }} />
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            )}

            {open ? (
              <ListItemButton
                selected={currentPath === "/analytics"}
                onClick={() => navigate("/analytics")}
              >
                <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                  <FaArrowTrendUp />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItemButton>
            ) : (
              <Tooltip
                title="Analytics"
                placement="right"
                componentsProps={styling}
                sx={{ mb: ".5rem" }}
              >
                <ListItemButton
                  selected={currentPath === "/analytics"}
                  onClick={() => navigate("/analytics")}
                >
                  <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                    <FaArrowTrendUp style={{ fontSize: "1.3rem" }} />
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            )}
            {open ? (
              <ListItemButton
                selected={currentPath === "/updates"}
                onClick={() => navigate("/updates")}
              >
                <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                  <Badge color="error" variant="dot">
                    <IoNotifications />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary="Updates" />
              </ListItemButton>
            ) : (
              <Tooltip
                title="Updates"
                placement="right"
                componentsProps={styling}
                sx={{ mb: ".5rem" }}
              >
                <ListItemButton
                  selected={currentPath === "/updates"}
                  onClick={() => navigate("/updates")}
                >
                  <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                    <Badge badgeContent={4} max={99} color="error">
                      <IoNotifications style={{ fontSize: "1.3rem" }} />
                    </Badge>
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            )}

            {open ? (
              <ListItemButton
                selected={currentPath === "/trash"}
                onClick={() => navigate("/trash")}
              >
                <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                  <FaTrash />
                </ListItemIcon>
                <ListItemText primary="Trash" />
              </ListItemButton>
            ) : (
              <Tooltip
                title="Trash"
                placement="right"
                componentsProps={styling}
                sx={{ mb: ".5rem" }}
              >
                <ListItemButton
                  selected={currentPath === "/trash"}
                  onClick={() => navigate("/trash")}
                >
                  <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                    <FaTrash style={{ fontSize: "1.1rem" }} />
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            )}
          </List>

          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            component="nav"
          >
            {open ? (
              <ListItemButton
                selected={currentPath === "/contact-us"}
                onClick={() => navigate("/contact-us")}
              >
                <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                  <MdContactSupport style={{ fontSize: "1.3rem" }} />
                </ListItemIcon>
                <ListItemText primary="Contact Us" />
              </ListItemButton>
            ) : (
              <Tooltip
                title="Contact Us"
                placement="right"
                componentsProps={styling}
                sx={{ mb: ".5rem" }}
              >
                <ListItemButton
                  selected={currentPath === "/contact-us"}
                  onClick={() => navigate("/contact-us")}
                >
                  <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                    <MdContactSupport style={{ fontSize: "1.5rem" }} />
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            )}

            {open ? (
              <ListItemButton
                selected={currentPath.startsWith("/settings")}
                onClick={() => setSettingsOpen(true)}
              >
                <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            ) : (
              <Tooltip
                title="Settings"
                placement="right"
                componentsProps={styling}
                sx={{ mb: ".5rem" }}
              >
                <ListItemButton
                  selected={currentPath.startsWith("/settings")}
                  onClick={() => setSettingsOpen(true)}
                >
                  <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                    <SettingsIcon style={{ fontSize: "1.5rem" }} />
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            )}
            {open ? (
              <ListItemButton
                onClick={() => setShowLogoutComp(!showLogoutComp)}
              >
                <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                  <FaPowerOff style={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: "red" }} />
              </ListItemButton>
            ) : (
              <Tooltip
                title="Logout"
                placement="right"
                componentsProps={styling}
              >
                <ListItemButton
                  onClick={() => setShowLogoutComp(!showLogoutComp)}
                >
                  <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                    <FaPowerOff style={{ color: "red", fontSize: "1.3rem" }} />
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            )}
            <Stack
              direction={"row"}
              justifyContent={open ? "flex-start" : "center"}
              pl={open ? ".5rem" : 0}
              mt={"1rem"}
              alignItems={"center"}
              gap={".2rem"}
            >
              <a href="/profile">
                {userData.profileImageUrl ? (
                  <Avatar
                    src={userData.profileImageUrl}
                    sx={{ bgcolor: "orangered" }}
                  />
                ) : (
                  <Avatar>
                    {userData.firstName[0].toUpperCase()}
                    {userData.lastName[0].toUpperCase()}
                  </Avatar>
                )}
              </a>
              {open && (
                <Typography
                  noWrap
                  sx={{
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {userData.username}
                </Typography>
              )}
            </Stack>
          </List>

          <Drawer
            anchor="left"
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            PaperProps={{
              elevation: 4,
              sx: {
                borderRadius: 2,
                width: 320,
                color: "#d3d3d3",
                py: "2rem",
                px: "1rem",
                boxSizing: "border-box",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                gap: ".7rem",
              }}
            >
              <IconButton
                onClick={() => setSettingsOpen(false)}
                sx={{ color: "red" }}
              >
                <IoMdClose />
              </IconButton>
              <Typography variant="h6" fontWeight={600}>
                Settings & Support
              </Typography>
            </Box>

            <List>
              <Typography
                variant="caption"
                sx={{ px: "1rem", color: "text.secondary" }}
              >
                General
              </Typography>
              <ListItemButton
                selected={currentPath === "/settings"}
                onClick={() => navigate("/settings")}
              >
                <ListItemText primary="Settings" />
              </ListItemButton>
              <ListItemButton
                selected={currentPath === "/settings/account"}
                onClick={() => navigate("/settings/account")}
              >
                <ListItemText primary="Account & security" />
              </ListItemButton>
              <ListItemButton
                selected={currentPath === "/settings/appearance"}
                onClick={() => navigate("/settings/appearance")}
              >
                <ListItemText primary="Appearance & Theme" />
              </ListItemButton>
              <ListItemButton
                sx={{ mb: "1rem" }}
                selected={currentPath === "/settings/sync-backup"}
                onClick={() => navigate("/settings/sync-backup")}
              >
                <ListItemText primary="Sync & Backup" />
              </ListItemButton>

              <Typography
                variant="caption"
                sx={{ px: "1rem", color: "text.secondary" }}
              >
                Experimental
              </Typography>
              <ListItemButton
                sx={{ mt: "1rem" }}
                selected={currentPath === "/settings/beta-tester"}
                onClick={() => navigate("/settings/beta-tester")}
              >
                <ListItemText primary="Be a beta tester" />
                <IoOpenOutline fontSize="1.3rem" />
              </ListItemButton>
              <ListItemButton
                sx={{ mb: "1rem" }}
                selected={currentPath === "/settings/whats-new"}
                onClick={() => navigate("/settings/whats-new")}
              >
                <ListItemText primary="What's new" />
                <IoOpenOutline fontSize="1.3rem" />
              </ListItemButton>
              <Typography
                variant="caption"
                sx={{ px: "1rem", color: "text.secondary" }}
              >
                Support
              </Typography>

              <ListItemButton
                sx={{ mt: "1rem" }}
                selected={currentPath === "/settings/help-center"}
                onClick={() => navigate("/settings/help-center")}
              >
                <ListItemText primary="Help center" />
                <IoOpenOutline fontSize="1.3rem" />
              </ListItemButton>
              <ListItemButton
                sx={{ mb: "1rem" }}
                selected={currentPath === "/settings/reports-violations"}
                onClick={() => navigate("/settings/reports-violations")}
              >
                <ListItemText primary="Reports & Violations Center" />
              </ListItemButton>
              <Typography
                variant="caption"
                sx={{ px: "1rem", color: "text.secondary" }}
              >
                Privacy
              </Typography>

              <ListItemButton
                selected={currentPath === "/settings/privacy-policy"}
                onClick={() => navigate("/settings/privacy-policy")}
              >
                <ListItemText primary="Privacy policy" />
                <IoOpenOutline fontSize="1.3rem" />
              </ListItemButton>
              <ListItemButton
                selected={currentPath === "/settings/terms"}
                onClick={() => navigate("/settings/terms")}
              >
                <ListItemText primary="Terms of service" />
                <IoOpenOutline fontSize="1.3rem" />
              </ListItemButton>
            </List>
          </Drawer>
        </Stack>
      </Drawer>
      {showLogoutComp && (
        <Logout
          open={showLogoutComp}
          onClose={() => setShowLogoutComp(false)}
        />
      )}
    </Stack>
  );
}

export default Sidebar;

const styling = {
  tooltip: {
    sx: {
      backgroundColor: "rgba(92, 92, 92, 0.4)",
      color: "#fff",
      fontSize: 13,
      borderRadius: 1,
      px: 1.5,
      py: 0.5,
    },
  },
};
