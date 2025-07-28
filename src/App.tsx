import { ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import darkTheme from "./theme/darkMode";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Settings from "./pages/Settings";
import AccountSecurityPage from "./pages/AccountSecurityPage";
import AppearanceAndTheme from "./pages/AppeareanceAndTheme";
import SyncBackup from "./pages/SyncBackup";
import HelpCenter from "./pages/HelpCenter";
import BetaTester from "./pages/BetaTester";
import WhatsNew from "./pages/WhatsNew";
import ReportsAndViolationsCenter from "./pages/ReportsAndViolationsCenter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfServicePage from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import CreateNote from "./pages/CreateNote";
import Profile from "./pages/Profile";
import EditNote from "./pages/EditNote";
import ReadNote from "./pages/ReadNote";
import Trash from "./pages/Trash";
import Protected from "./components/Protected";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          />
          <Route
            path="/settings"
            element={
              <Protected>
                <Settings />
              </Protected>
            }
          />
          <Route
            path="/settings/account"
            element={
              <Protected>
                <AccountSecurityPage />
              </Protected>
            }
          />
          <Route
            path="/settings/appearance"
            element={
              <Protected>
                <AppearanceAndTheme />
              </Protected>
            }
          />
          <Route
            path="/settings/sync-backup"
            element={
              <Protected>
                <SyncBackup />
              </Protected>
            }
          />
          <Route
            path="/settings/help-center"
            element={
              <Protected>
                <HelpCenter />
              </Protected>
            }
          />
          <Route
            path="/settings/beta-tester"
            element={
              <Protected>
                <BetaTester />
              </Protected>
            }
          />
          <Route
            path="/settings/whats-new"
            element={
              <Protected>
                <WhatsNew />
              </Protected>
            }
          />
          <Route
            path="/settings/reports-violations"
            element={
              <Protected>
                <ReportsAndViolationsCenter />
              </Protected>
            }
          />
          <Route
            path="/settings/privacy-policy"
            element={
              <Protected>
                <PrivacyPolicy />
              </Protected>
            }
          />
          <Route
            path="/settings/terms"
            element={
              <Protected>
                <TermsOfServicePage />
              </Protected>
            }
          />
          <Route
            path="/contact-us"
            element={
              <Protected>
                <ContactUs />
              </Protected>
            }
          />
          <Route
            path="/notes/create"
            element={
              <Protected>
                <CreateNote />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/notes/:noteId/edit"
            element={
              <Protected>
                <EditNote />
              </Protected>
            }
          />
          <Route
            path="/notes/:noteId"
            element={
              <Protected>
                <ReadNote />
              </Protected>
            }
          />
          <Route
            path="/trash"
            element={
              <Protected>
                <Trash />
              </Protected>
            }
          />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
