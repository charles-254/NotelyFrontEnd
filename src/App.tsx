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
          <Route path="/home" element={<HomePage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/account" element={<AccountSecurityPage />} />
          <Route path="/settings/appearance" element={<AppearanceAndTheme />} />
          <Route path="/settings/sync-backup" element={<SyncBackup />} />
          <Route path="/settings/help-center" element={<HelpCenter />} />
          <Route path="/settings/beta-tester" element={<BetaTester />} />
          <Route path="/settings/whats-new" element={<WhatsNew />} />
          <Route
            path="/settings/reports-violations"
            element={<ReportsAndViolationsCenter />}
          />
          <Route path="/settings/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/settings/terms" element={<TermsOfServicePage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/notes/create" element={<CreateNote />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notes/:noteId/edit" element={<EditNote />} />
          <Route path="/notes/:noteId" element={<ReadNote />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
