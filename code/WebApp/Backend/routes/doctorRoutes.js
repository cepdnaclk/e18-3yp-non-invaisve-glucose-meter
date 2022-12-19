const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticateToken = require("../middlewares/auth");

// let refreshTokens = [];

router.post("/addDoctor", async (req, res) => { // FOR TESTING bcz doctor authentication part is not yet added
    try {
      
      
      const existingDoctor = await User.findOne({
        email: req.body.email,
      });
  
      if (existingDoctor) {
        return res.status(401).json({
          message: "You have already signed up. Try Login"
        });
      }
  
      const newDoctor = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        hospital: req.body.hospital,
        specialized_in: req.body.specialized_in,
        contact_no: req.body.contact_no,
        role: req.body.role,
      });
      
      const doc = await newDoctor.save();
      // const others = patient._doc;
      // others["message"] = "Successfully added";
      return res.status(200).json({
        success: true,
        message: "Successfully added",
        
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // get all doctors
  router.get("/allDoctors",  async (req, res) => {
    try {
      console.log("called")
      
      const doctors = await User.find({}, {"username": 1, "specialized_in": 1, "hospital": 1});
      console.log(doctors)
      return res.status(200).send({ doctors: doctors });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  });
  
  module.exports = router;
