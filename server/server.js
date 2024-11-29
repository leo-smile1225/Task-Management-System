const express = require("express");
const passport = require("passport");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
const mongooseConnection = require("./helpers/mongoose-connection");
const appRoutes = require("./routes");
const socket = require("socket.io");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./middleware/passport")(passport);
app.use("/api", appRoutes);

app.use((_, res) => {
  res.send({
    message: "Not found!",
  });
});

mongooseConnection();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const onlineUsers = new Map();
