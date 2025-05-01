import "./App.css";
import DashboardLayout from "./components/DashboardLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import DashboardPage from "./components/pages/DashboardPage";
import SubmitTicketPage from "./components/pages/tickets/SubmitTicketPage";
import AllProjectsPage from "./components/pages/projects/AllProjectsPage";
import CreateProjectPage from "./components/pages/projects/CreateProjectPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import LoginPage from "./components/pages/auth/LoginPage";
import RegisterPage from "./components/pages/auth/RegisterPage";
import { AuthProvider } from "./auth/AuthProvider";
import PrivateRoute from "./auth/PrivateRoute";
import DetailsProjectPage from "./components/pages/projects/DetailsProjectPage";
import OpenTicketsPage from "./components/pages/tickets/OpenTicketsPage";
import MyTicketsPage from "./components/pages/tickets/MyTicketsPage";
import ResolvedTicketsPage from "./components/pages/tickets/ResolvedTicketsPage";
import TicketPage from "./components/pages/tickets/TicketPage";
import EditTicketPage from "./components/pages/tickets/EditTicketPage";
import EditProjectPage from "./components/pages/projects/EditProjectPage";

function App() {
  return (
    <>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                element={
                  <PrivateRoute>
                    <DashboardLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="/projects" element={<AllProjectsPage />} />
                <Route
                  path="/projects/:project_id"
                  element={<DetailsProjectPage />}
                />
                <Route
                  path="/projects/create"
                  element={<CreateProjectPage />}
                />
                <Route
                  path="/projects/:project_id/edit"
                  element={<EditProjectPage />}
                />
                <Route path="/tickets/open" element={<OpenTicketsPage />} />
                <Route
                  path="/tickets/resolved"
                  element={<ResolvedTicketsPage />}
                />
                <Route path="/tickets/own" element={<MyTicketsPage />} />
                <Route path="/tickets/submit" element={<SubmitTicketPage />} />
                <Route
                  path="/tickets/:project_id/:ticket_id"
                  element={<TicketPage />}
                />
                <Route
                  path="/tickets/:project_id/:ticket_id/edit"
                  element={<EditTicketPage />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </AuthProvider>
    </>
  );
}

export default App;
