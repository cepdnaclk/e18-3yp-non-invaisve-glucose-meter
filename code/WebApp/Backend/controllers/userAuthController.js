const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const DoctorRequest = require("../models/DoctorRequestModel");
const Patient = require("../models/Patient");
const PatientRequest = require("../models/patientRequestModel");
const RefreshToken = require("../models/RefreshTokenModel");

const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    /* const emailRequestedPatient = await PatientRequest.findOne({
      email: req.body.email,
    }); */
    const emailRequestedDoctor = await DoctorRequest.findOne({
      email: req.body.email,
    });
    /* if (emailRequestedPatient) {
      return res.status(401).json({
        error: "Patient Request under given email is already being processed",
      });
    } else */
    if (emailRequestedDoctor) {
      return res.status(401).json({
        error: "Doctor Request under given email is already being processed",
      });
    }

    const emailRegistered = await Doctor.findOne({ email: req.body.email });
    if (emailRegistered) {
      return res.status(401).json({
        error: "Email address is already in use",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newRequest = new DoctorRequest({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      contact_no: req.body.contact_no,
      hospital: req.body.hospital,
      specialized_in: req.body.specialized_in,
    });
    const user = await newRequest.save();

    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      message: "The Request sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user =
      (await Doctor.findOne({ email: req.body.email })) ||
      (await Patient.findOne({ email: req.body.email }));

    if (!user) {
      return res.status(400).json({
        error: "Incorrect credentials!",
      });
    }

    const validatedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatedPassword) {
      return res.status(400).json({
        error: "Incorrect credentials!",
      });
    }

    const access_token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    );

    const refresh_token = await RefreshToken.createToken(user);

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      message: "Login Successful",
      access_token: access_token,
      refresh_token: refresh_token,
    }) /* .cookie('jwt', access_token, { httpOnly: true, maxAge: 5 * 60 * 1000, sameSite: 'strict' })
    .cookie('jwtRefresh', refresh_token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 }) */;
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const logoutUser = async (req, res) => {
  res.status(200).clearCookie("jwt").clearCookie("jwtRefresh").redirect("/");
};

const refreshToken = async (req, res) => {
  receivedRefreshToken = req.body.refresh_token;

  if (!receivedRefreshToken) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is invalid!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      return res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
    }

    const newAccessToken = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    );

    return res
      .status(200)
      .json({
        //   accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      })
      .cookie("jwt", newAccessToken, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
        sameSite: "strict",
      });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const initialUser = async (req, res) => {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new Doctor({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      specialized_in: req.body.specialized_in,
      contact_no: req.body.contact_no,
      hospital: req.body.hospital,
      role: req.body.role,
    });
    const user = await newUser.save();
    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      message: "The Request sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  initialUser,
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
};
