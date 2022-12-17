const router = require("express").Router();
const User = require("../models/userPatient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let refreshTokens = [];

/*************** post method to sign up a user to the database *****************************/

router.post("/signup", async (req, res) => {
  try {
    

    // avoid duplicate users (409 conflict-request could not be processed because of conflict in the request )
    const userByEmail = await User.findOne({ email: req.body.email });
    if (userByEmail) {
      return res
        .status(200)
        .json({ success: false, message: "This Email already in use." });
    }
    
    // encrypt the password - for security purposes
    const salt = await bcrypt.genSalt(10);
   
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log("called");
    const newUser = await User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, // store the encrypted password
      contact_no: req.body.contact_no,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,

    });
    

    const user = await newUser.save();
    return res.status(200).json({
      success: true,
      message: "You are successfully registered",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

/****************** post method to login a user *****************************/

router.post("/login", async (req, res) => {
  try {
    
      console.log("login called")
    // check whether the user has already signed up
    const userByEmail = await User.findOne({ email: req.body.email });
    if (!userByEmail)
      return res
        .status(200)
        .json({ success: false, message: "Wrong credentials!" });

    const userByPassword = await bcrypt.compare(
      req.body.password,
      userByEmail.password
    );
    if (!userByPassword)
      return res
        .status(200)
        .json({ success: false, message: "Wrong credentials!" });

    // create json web token and send it with the login request
    
    // access tokens for autherization
    const access_token = jwt.sign(
      { email: userByEmail.email, role: userByEmail.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.REFRESH_TIME }
    );
    
    // refresh tokens to refresh the access token when expired
    const refresh_token = jwt.sign(
      { email: userByEmail.email, role: userByEmail.role },
      process.env.REFRESH_SECRET
    );
    refreshTokens.push(refresh_token); // refresh token will be expired at log out
    console.log(access_token);
   
    res
      .status(200)
      .json({
        success: true,
        user: userByEmail,
        access_token: access_token,
        refresh_token: refresh_token,
      });
    
  } catch (error) {
    res.status(500).json(error);
  }
});

// log out
// router.post("/logout", (req, res) => {
 
//   const refreshToken = req.header("refresh_token");
//   if (!refreshToken)
//     return res.status(401).json({ message: "Authentication failed" });

//   refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
//   res.status(200).json({ message: "Successfuly logged out" });
// });

// re-new access token
router.post("/token", (req, res) => {
  console.log("New access token generating ... \n");

  const refreshToken = req.header("refresh_token");
  console.log("this is the refresh token = " + req.header("refresh_token") + "\n");

  if (!refreshToken){
    console.log("No refresh token sent with the header\n");
    return res.status(401).json({ message: "Authentication failed" });
  }
    
  if (!refreshTokens.includes(refreshToken)){
    console.log("refresh token sent with the header is not found in refreshTokens[] array\n");
    return res.status(403).json({ message: "Authentication failed" });
  }
    
  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, result) => {
    if (err) return res.status(500).json({ message: "Authentication failed" });

    const access_token = jwt.sign(
      { email: result.email, role: result.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.REFRESH_TIME }
    );

    console.log("new access token created = " + access_token + "\n");
    res.status(200).json({ access_token: access_token });
  });
});

module.exports = router;
