require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/child_rights_platform",
  jwtSecret: process.env.JWT_SECRET || "change-this-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  emailFrom: process.env.EMAIL_FROM || "no-reply@example.org",
  nodeEnv: process.env.NODE_ENV || "development"
};
