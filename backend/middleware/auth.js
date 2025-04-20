const jwt = require("jsonwebtoken");

function authRole(role) {
  return (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access Denied");

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      if (role && req.user.role !== role)
        return res.status(403).send("Access Denied");
      next();
    } catch (err) {
      res.status(400).send("Invalid Token");
    }
  };
}

module.exports = authRole;
