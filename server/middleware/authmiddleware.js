const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/secretkey");

// const verifyToken = (req, res, next) => {
//   let token = req.header.token;
//   if (!token) {
//     return res.status(403).json({ message: "No token exist" });
//   }
//   jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Unauthorized!" });
//     }
//     req.body._id = decoded._id;
//     next();
//   });
// };

module.exports = isAdmin = (req, res, next) => {
  const data = User.findById(req.body._id);
  if (data.role == "admin") {
    next();
    return;
  } else {
    return res.status(404).json({ message: "Not permitted!" });
  }
};
