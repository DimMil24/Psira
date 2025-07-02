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
import { Link, Outlet, matchPath, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/error/ErrorPage";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import PortraitIcon from "@mui/icons-material/Portrait";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

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
            <ListItem key={"Dashboard"} disablePadding>
              <ListItemButton
                selected={amISelected("/")}
                component={Link}
                to="/"
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem key={"All Projects"} disablePadding>
              <ListItemButton
                selected={amISelected("/projects")}
                component={Link}
                to={"/projects"}
              >
                <ListItemIcon>
                  <FolderCopyIcon />
                </ListItemIcon>
                <ListItemText primary="All Projects" />
              </ListItemButton>
            </ListItem>
            {(user?.role === "ROLE_ADMIN" || user?.role === "ROLE_MANAGER") && (
              <ListItem key={"Create Project"} disablePadding>
                <ListItemButton
                  selected={amISelected("/projects/create")}
                  component={Link}
                  to={"/projects/create"}
                >
                  <ListItemIcon>
                    <CreateNewFolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Project" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
          <Divider />
          <List>
            {(user?.role === "ROLE_DEVELOPER") && (
              <ListItem key={"Create Project"} disablePadding>
                <ListItemButton
                  selected={amISelected("/tickets/assigned")}
                  component={Link}
                  to={"/tickets/assigned"}
                >
                  <ListItemIcon>
                    <CreateNewFolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Assigned Tickets" />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem key={"Open Tickets"} disablePadding>
              <ListItemButton
                selected={amISelected("/tickets/open")}
                component={Link}
                to={"/tickets/open"}
              >
                <ListItemIcon>
                  <ImportContactsIcon />
                </ListItemIcon>
                <ListItemText primary="Open Tickets" />
              </ListItemButton>
            </ListItem>
            <ListItem key={"My Tickets"} disablePadding>
              <ListItemButton
                selected={amISelected("/tickets/own")}
                component={Link}
                to={"/tickets/own"}
              >
                <ListItemIcon>
                  <PortraitIcon />
                </ListItemIcon>
                <ListItemText primary="My Tickets" />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Resolved Tickets"} disablePadding>
              <ListItemButton
                selected={amISelected("/tickets/resolved")}
                component={Link}
                to={"/tickets/resolved"}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Resolved Tickets" />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Submit Ticket"} disablePadding>
              <ListItemButton
                selected={amISelected("/tickets/submit")}
                component={Link}
                to={"/tickets/submit"}
              >
                <ListItemIcon>
                  <AssignmentLateIcon />
                </ListItemIcon>
                <ListItemText primary="Submit Ticket" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key="account" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={user?.fullName} />
              </ListItemButton>
            </ListItem>

            <ListItem key="logout" disablePadding>
              <ListItemButton onClick={() => logout()}>
                <ListItemIcon>
                  <LogoutIcon />
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
