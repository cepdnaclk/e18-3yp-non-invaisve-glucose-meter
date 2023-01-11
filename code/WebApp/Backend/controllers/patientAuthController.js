const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const DoctorRequest = require("../models/DoctorRequestModel");
const Patient = require("../models/Patient");
const PatientRequest = require("../models/patientRequestModel");
const RefreshToken = require("../models/RefreshTokenModel");
let refreshTokens = [];
const registerPatient = async (req, res) => {
  //   console.log(req.body);
  try {
    console.log("/mobile/signup called ..")
    
    const emailRegistered = await Patient.findOne({ email: req.body.email });
    if (emailRegistered) {
      return res.status(401).json({
        error: "Email address is already in use",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const newPatient = new Patient({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: 3,
      contact_no: req.body.contact_no,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
    });
    const user = await newPatient.save();
    

    return res.status(200).json({
      success: true,
      message: "You are successfully registered",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const loginPatient = async (req, res) => {
  try {
   
    const user = await Patient.findOne({ email: req.body.email });
    console.log("/mobile/login called ..")
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Incorrect credentials!",
      });
    }
    

    const validatedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatedPassword) {
      return res.status(200).json({
        success: false,
        message: "Incorrect credentials!",
      });
    }

    // access tokens for autherization
    const access_token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    );

    // refresh tokens to refresh the access token when expired
    const refresh_token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.REFRESH_SECRET
    );
    refreshTokens.push(refresh_token); // refresh token will be expired at log out
    console.log("firstly created refresh token : " + refreshTokens)


    res.status(200).json({
      success: true,
      user: user,
      access_token: access_token,
      refresh_token: refresh_token,
    });
   
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

// log out
const logoutPatient = async (req, res) => {
  
  const refreshToken = req.header("refresh_token");
  
  if (!refreshToken)
    return res.status(401).json({ message: "Authentication failed" });

  console.log(refreshTokens.includes(refreshToken))

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json({ message: "Successfuly logged out" });
};

const refreshTokenPatient = async (req, res) => {
  console.log(refreshTokens)
  console.log("New access token generating ... \n");

  const refreshToken = req.header("refresh_token");
  console.log(
    "this is the refresh token = " + req.header("refresh_token") + "\n"
  );

  if (!refreshToken) {
    console.log("No refresh token sent with the header\n");
    return res.status(401).json({ message: "Authentication failed" });
  }

  if (!refreshTokens.includes(refreshToken)) {
    console.log(
      "refresh token sent with the header is not found in refreshTokens[] array\n"
    );
    return res.status(403).json({ message: "Authentication failed" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, result) => {
    if (err) return res.status(500).json({ message: "Authentication failed" });

    const access_token = jwt.sign(
      { email: result.email, role: result.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    );

    console.log("new access token created = " + access_token + "\n");
    res.status(200).json({ access_token: access_token });
  });
};

const initialPatient = async (req, res) => {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new Patient({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      contact_no: req.body.contact_no,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
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
  initialPatient,
  registerPatient,
  loginPatient,
  logoutPatient,
  refreshTokenPatient,
};
