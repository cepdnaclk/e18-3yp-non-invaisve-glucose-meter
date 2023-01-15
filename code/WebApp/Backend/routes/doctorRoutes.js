const router = require("express").Router();
const User = require("../models/Doctor");
const Patient = require("../models/Patient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticateToken = require("../middlewares/auth");
const checkAuth = require("../middlewares/checkAuthDoc");

router.post("/addDoctor", async (req, res) => {
  // FOR TESTING bcz doctor authentication part is not yet added
  try {
    const existingDoctor = await User.findOne({
      email: req.body.email,
    });

    if (existingDoctor) {
      return res.status(401).json({
        message: "You have already signed up. Try Login",
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
      code: 1,
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

// get one doctors
router.post("/getDoctor", authenticateToken, async (req, res) => {
  try {
    console.log("get doc called");
    const userByEmail = await Patient.findOne({ email: req.user.email });
    const doctorByCode = await User.findOne({ code: req.body.doctorcode });
    if (!doctorByCode) {
      return res
        .status(200)
        .json({ success: false, message: "No doctor found under this code" });
    }

    console.log(doctorByCode);
    if (userByEmail.doctor_id.includes(doctorByCode._id)) {
      return res.status(200).json({
        success: false,
        message: "You have already subscribed to this doctor",
      });
    }

    return res
      .status(200)
      .send({ success: true, doctor: doctorByCode.username });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

// get all doctors
router.get("/allDoctors", authenticateToken, async (req, res) => {
  try {
    console.log(req.user);

    const doctors = await User.find(
      {},
      { username: 1, specialized_in: 1, hospital: 1 }
    );
    console.log(doctors);
    return res.status(200).send({ doctors: doctors, name: req.user.username });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.get("/allPatients", checkAuth, async (req, res) => {
  try {
    console.log(req);
    console.log("Inside allPatients");

    const doctor = await User.findOne({ email: req.user.email });

    console.log(doctor);

    const patientData = [];

    // return res.status(200).send({ patients: doctor.subscribed_patients });
    Patient.find({ _id: { $in: doctor.subscribed_patients } }).toArray(
      (err, patients) => {
        patientData = patients.map((patient) => ({
          name: patient.name,
          age: patient.age,
          weight: patient.weight,
          height: patient.height,
        }));
      }
    );
    console.log("Printing....!");
    console.log(patientData);
    // send the patient data as a response
    return res.status(200).json(patientData);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.get("/getPatient", checkAuth, async (req, res) => {
  try {
    console.log(req.user);
    const patient = await Patient.findOne({ _id: req.body.id }).select(
      "-password"
    );
    return res.status(200).send({
      name: patient.username,
      age: patient.age,
      weight: patient.weight,
      height: patient.height,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

// subscribe
router.post("/subscribeDoc", authenticateToken, async (req, res) => {
  try {
    console.log("subscribe called");

    const userByEmail = await Patient.findOne({ email: req.user.email });
    const doctorByCode = await User.findOne({ code: req.body.doctorcode });

    userByEmail.doctor_id.push(doctorByCode._id);
    const user2 = await userByEmail.save();

    doctorByCode.subscribed_patients.push(userByEmail._id);
    const user3 = await doctorByCode.save();

    return res.status(200).send({ success: true });
    // return res.status(200).send({ doctor: docterById.username, name: req.user.username });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
