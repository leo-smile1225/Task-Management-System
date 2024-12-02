const express = require("express");
const passport = require("passport");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
const mongooseConnection = require("./helpers/mongoose-connection");
const appRoutes = require("./routes");
const socket = require("socket.io");
const multer = require("multer");
const path = require("path");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("uploads"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage });
// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./middleware/passport")(passport);
app.use("/api", appRoutes);

mongooseConnection();
const PORT = process.env.PORT || 5000;
app.post("/upload", upload.single("avatar"), (req, res) => {
  console.log(req.file.filename);
  if (req.file) {
    res.json({ url: `http://192.168.142.171:${PORT}/${req.file.filename}` });
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
});
app.use((_, res) => {
  res.send({
    message: "Not found!",
  });
});
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

//chat socket

io.on("connection", (socket) => {
  console.log("connect to socket", socket.id);
  global.chatSocket = socket;

  socket.on("msg-send", (data) => {
    io.emit("msg-receive", data);
  });
});
