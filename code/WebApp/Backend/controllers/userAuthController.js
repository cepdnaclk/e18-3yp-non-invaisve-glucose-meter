const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor")
const DoctorRequest = require("../models/DoctorRequestModel")
const Patient = require("../models/Patient")
const PatientRequest = require("../models/patientRequestModel")

const registerUser = async (req, res) => {
    console.log(req.body);
    try {
      const emailRequestedPatient = await PatientRequest.findOne({ email: req.body.email });
      const emailRequestedDoctor = await DoctorRequest.findOne({ email: req.body.email });
      if (emailRequestedPatient) {
        return res.status(401).json({
          error: "Patient Request under given email is already being processed",
        });
      } else if(emailRequestedDoctor) {
        return res.status(401).json({
            error: "Doctor Request under given email is already being processed",
          });
      }
  
      const emailRegistered = await (Doctor.findOne({ email: req.body.email }) || Patient.findOne({ email: req.body.email }));
      if (emailRegistered) {
        return res.status(401).json({
          error: "Email address is already in use",
        });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      
      const newRequest = (req.body.role === 3) ? new PatientRequest({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        age: req.body.age,
        weight: req.body.weight,
        height: req.body.height,
      }) : 
      new DoctorRequest({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        contact_no: req.body.contact_no,
        hospital: req.body.hospital,
        specialized_in: req.body.specialized_in
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
  