import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { MoveToInbox, Mail } from "@mui/icons-material";
import { projectTabs, ticketTabs } from "../utils/dashboardTabs";
import { Link, Outlet, matchPath, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/error/ErrorPage";

const drawerWidth = 240;

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { user, logout } = useContext(AuthContext);
  const amISelected = (path) => matchPath(pathname, path);
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Psira
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Dashboard"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  selected={amISelected("/")}
                  component={Link}
                  to="/"
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
        <Box sx={{ overflow: "auto" }}>
          <List>
            {projectTabs.map((entry, index) => {
              if (
                (user?.role === "ROLE_SUBMITTER" ||
                  user?.role === "ROLE_DEVELOPER") &&
                entry.managersOnly
              ) {
                return;
              }
              return (
                <ListItem key={entry.label} disablePadding>
                  <ListItemButton
                    selected={amISelected(entry.link)}
                    component={Link}
                    to={entry.link}
                  >
                    <ListItemIcon>
                      {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
                    </ListItemIcon>
                    <ListItemText primary={entry.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Divider />
          <List>
            {ticketTabs.map((entry, index) => (
              <ListItem key={entry.label} disablePadding>
                <ListItemButton
                  selected={amISelected(entry.link)}
                  component={Link}
                  to={entry.link}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
                  </ListItemIcon>
                  <ListItemText primary={entry.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem key="account" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Mail />
                </ListItemIcon>
                <ListItemText primary={user?.fullName} />
              </ListItemButton>
            </ListItem>

            <ListItem key="logout" disablePadding>
              <ListItemButton onClick={() => logout()}>
                <ListItemIcon>
                  <Mail />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
        <ErrorBoundary
          FallbackComponent={ErrorPage}
          resetKeys={[location.pathname]}
        >
          <Outlet />
        </ErrorBoundary>
      </Box>
    </Box>
  );
}
