const app = require("./app");
const connectDB = require("./config/db");
const { port } = require("./config/environment");

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Child Rights Reporting Platform API listening on port ${port}`);
  });
});
