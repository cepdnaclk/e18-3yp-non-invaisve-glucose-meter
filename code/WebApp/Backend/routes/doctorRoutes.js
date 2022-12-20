const router = require("express").Router();
const User = require("../models/Doctor");
const Patient = require("../models/Patient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticateToken = require("../middlewares/auth");
const checkAuth = require("../middlewares/checkAuthMobile");

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
        role: 2,
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
  router.get("/allDoctors",  authenticateToken, async (req, res) => {
    try {
      console.log(req.user)
      
      const doctors = await User.find({}, {"username": 1, "specialized_in": 1, "hospital": 1});
      console.log(doctors)
      return res.status(200).send({ doctors: doctors, name: req.user.username });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  });
  
  router.get("/allPatients",  checkAuth, async (req, res) => {
    try {
      console.log(req.user)
      
      const doctor = await User.findOne({email: req.body.email});
      // console.log(doctors)
      return res.status(200).send({ patients: doctor.subscribed_patients });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  });

  // subscribe
  router.post("/subscribeDoc",  checkAuth, async (req, res) => {
    try {
      
      const userByEmail = await Patient.findOne({ email: req.user.email }); 
      userByEmail.doctor_id.push(req.body.doctorid);
      const user2 = await userByEmail.save();

      const docterById = await User.findOne({ _id: req.body.doctorid });
      docterById.subscribed_patients.push(userByEmail._id);
      const user3 = await docterById.save();

      return res.status(200).send({ doctors: doctors, name: req.user.username });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;
