/*
 * Project: CO300 3YP
 * Github Repository: https://github.com/cepdnaclk/e18-3yp-non-invaisve-glucose-meter
 * Authors:
 *  - Kavinda Karunarathne (E/18/170)
 *  - Nethmi Ranasinghe (E/18/282)
 *  - Denuwan Weerarathne (E/18/382)
 */

const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");

const catchError = (err, res) => {
  if (err instanceof jwt.TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const authenticateTokenWeb = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(403).send({ message: "No token provided!" });
  }

  const token = req.headers.authorization.split(" ")[1];
  const email = req.body.email;

  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
    if (error) {
      return catchError(error, res);
    }
    const userDoctor = await Doctor.findOne({ email: decoded.email }).select(
      "-password"
    );

    if (
      !userDoctor ||
      JSON.stringify(userDoctor.role) !== JSON.stringify(decoded.role)
    ) {
      return res.status(401).json({
        error: "Unauthorized access",
      });
    }
    req.user = decoded;

    next();
  });
};

module.exports = authenticateTokenWeb;
