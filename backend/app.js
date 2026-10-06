const express = require("express");
const cors = require("cors");
const { clientUrl } = require("./config/environment");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");
const reportCategoriesRoutes = require("./routes/reportCategoriesRoutes");
const caseRoutes = require("./routes/caseRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const contentRoutes = require("./routes/contentRoutes");
const eventRoutes = require("./routes/eventRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const adminRoutes = require("./routes/adminRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json());

app.get("/api/v1/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/report-categories", reportCategoriesRoutes);
app.use("/api/v1/cases", caseRoutes);
app.use("/api/v1/resources", resourceRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/campaigns", campaignRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
