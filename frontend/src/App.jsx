import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";

// public
import Home from "./pages/public/Home.jsx";
import About from "./pages/public/About.jsx";
import Awareness from "./pages/public/Awareness.jsx";
import ArticleDetails from "./pages/public/ArticleDetails.jsx";
import Resources from "./pages/public/Resources.jsx";
import ResourceDetails from "./pages/public/ResourceDetails.jsx";
import Events from "./pages/public/Events.jsx";
import Campaigns from "./pages/public/Campaigns.jsx";
import EmergencyHelp from "./pages/public/EmergencyHelp.jsx";

// auth
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import VerifyAccount from "./pages/auth/VerifyAccount.jsx";
import ProfessionalVerification from "./pages/auth/ProfessionalVerification.jsx";

// reporting
import ReportIntroduction from "./pages/reporting/ReportIntroduction.jsx";
import ReportForm from "./pages/reporting/ReportForm.jsx";
import ReportLocation from "./pages/reporting/ReportLocation.jsx";
import ReportAttachments from "./pages/reporting/ReportAttachments.jsx";
import ReportReview from "./pages/reporting/ReportReview.jsx";
import ReportSuccess from "./pages/reporting/ReportSuccess.jsx";
import TrackReport from "./pages/reporting/TrackReport.jsx";

// reviewer
import ReviewerDashboard from "./pages/reviewer/ReviewerDashboard.jsx";
import CaseQueue from "./pages/reviewer/CaseQueue.jsx";
import CaseDetails from "./pages/reviewer/CaseDetails.jsx";
import AuditTrail from "./pages/reviewer/AuditTrail.jsx";

// admin
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import UserManagement from "./pages/admin/UserManagement.jsx";
import VerificationRequests from "./pages/admin/VerificationRequests.jsx";
import ContentManagement from "./pages/admin/ContentManagement.jsx";
import ResourceManagement from "./pages/admin/ResourceManagement.jsx";
import EventManagement from "./pages/admin/EventManagement.jsx";
import CampaignManagement from "./pages/admin/CampaignManagement.jsx";
import Analytics from "./pages/admin/Analytics.jsx";
import ReportsExport from "./pages/admin/ReportsExport.jsx";

// profile
import Profile from "./pages/profile/Profile.jsx";
import Settings from "./pages/profile/Settings.jsx";
import Notifications from "./pages/profile/Notifications.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/awareness" element={<Awareness />} />
      <Route path="/awareness/:id" element={<ArticleDetails />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/resources/:id" element={<ResourceDetails />} />
      <Route path="/events" element={<Events />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/emergency-help" element={<EmergencyHelp />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-account" element={<VerifyAccount />} />
      <Route path="/professional-verification" element={<ProfessionalVerification />} />

      {/* Reporting flow (any signed-in or anonymous user) */}
      <Route path="/report" element={<ReportIntroduction />} />
      <Route path="/report/form" element={<ReportForm />} />
      <Route path="/report/location" element={<ReportLocation />} />
      <Route path="/report/attachments" element={<ReportAttachments />} />
      <Route path="/report/review" element={<ReportReview />} />
      <Route path="/report/success" element={<ReportSuccess />} />
      <Route path="/track-report" element={<TrackReport />} />

      {/* Reviewer (caseworker) */}
      <Route path="/reviewer" element={<ProtectedRoute><RoleRoute roles={["reviewer","admin"]}><ReviewerDashboard /></RoleRoute></ProtectedRoute>} />
      <Route path="/reviewer/queue" element={<ProtectedRoute><RoleRoute roles={["reviewer","admin"]}><CaseQueue /></RoleRoute></ProtectedRoute>} />
      <Route path="/reviewer/cases/:caseId" element={<ProtectedRoute><RoleRoute roles={["reviewer","admin"]}><CaseDetails /></RoleRoute></ProtectedRoute>} />
      <Route path="/reviewer/cases/:caseId/audit-trail" element={<ProtectedRoute><RoleRoute roles={["reviewer","admin"]}><AuditTrail /></RoleRoute></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute><RoleRoute roles={["admin"]}><AdminDashboard /></RoleRoute></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><RoleRoute roles={["admin"]}><UserManagement /></RoleRoute></ProtectedRoute>} />
      <Route path="/admin/verification-requests" element={<ProtectedRoute><RoleRoute roles={["admin"]}><VerificationRequests /></RoleRoute></ProtectedRoute>} />
      <Route path="/admin/content" element={<ProtectedRoute><RoleRoute roles={["admin"]}><ContentManagement /></RoleRoute></ProtectedRoute>} />
      <Route path="/admin/resources" element={<ProtectedRoute><RoleRoute roles={["admin"]}><ResourceManagement /></RoleRoute></ProtectedRoute>} />
      <Route path="/admin/events" element={<ProtectedRoute><RoleRoute roles={["admin"]}><EventManagement /></RoleRoute></ProtectedRoute>} />
      <Route path="/admin/campaigns" element={<ProtectedRoute><RoleRoute roles={["admin"]}><CampaignManagement /></RoleRoute></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute><RoleRoute roles={["admin"]}><Analytics /></RoleRoute></ProtectedRoute>} />
      <Route path="/admin/reports-export" element={<ProtectedRoute><RoleRoute roles={["admin"]}><ReportsExport /></RoleRoute></ProtectedRoute>} />

      {/* Profile */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
    </Routes>
  );
}
