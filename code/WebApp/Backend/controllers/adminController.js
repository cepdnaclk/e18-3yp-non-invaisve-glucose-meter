/*
 * Project: CO300 3YP
 * Github Repository: https://github.com/cepdnaclk/e18-3yp-non-invaisve-glucose-meter
 * Authors:
 *  - Kavinda Karunarathne (E/18/170)
 *  - Nethmi Ranasinghe (E/18/282)
 *  - Denuwan Weerarathne (E/18/382)
 */
const PatientRequest = require("../models/patientRequestModel");
const DoctorRequest = require("../models/DoctorRequestModel");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
let docCode = 2;

const getAllPatientRequests = async (req, res) => {
  try {
    const requests = await PatientRequest.find().select("-password");

    return res.status(200).json(requests);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

const getAllDoctorRequests = async (req, res) => {
  try {
    const requests = await DoctorRequest.find().select("-password");
    // const requests = await DoctorRequest.find().where('role').equals("2").select('-password')

    return res.status(200).json(requests);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const requestDoctor = await DoctorRequest.findById(req.params.id);
    const requestPatient = await PatientRequest.findById(req.params.id);

    if (requestDoctor) {
      try {
        await DoctorRequest.findByIdAndDelete(req.params.id);
        res.status(200).json({
          message: "Request deleted successfully",
        });
      } catch (error) {
        return res.status(500).json({
          error: "Request deletion failed",
        });
      }
    } else if (requestPatient) {
      try {
        await PatientRequest.findByIdAndDelete(req.params.id);
        res.status(200).json({
          message: "Request deleted successfully",
        });
      } catch (error) {
        return res.status(500).json({
          error: "Request deletion failed",
        });
      }
    } else {
      return res.status(404).json({
        error: "Request not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const doctorRequest = await DoctorRequest.findById(req.params.id);
    // const doctorRequest = await DoctorRequest.findById(req.params.id);
    // const patientRequest = await PatientRequest.findById(req.params.id)
    console.log(doctorRequest);
    const latestDocAdded = await Doctor.find().sort({ code: -1 }).limit(1);
    if (doctorRequest) {
      console.log("Before creating a new Doc!");
      console.log(typeof latestDocAdded[0].code)
      const newDoctor = new Doctor({
        username: request.username,
        email: request.email,
        password: request.password,
        contact_no: request.contact_no,
        specialized_in: request.specialized_in,
        hospital: request.hospital,
        role: request.role,
        code: (parseInt(latestDocAdded[0].code) + 1).toString(),
      });
      console.log("After creating a new Doc!");
      docCode = docCode + 1;
      console.log(newDoctor);
      try {
        const adduser = await newDoctor.save();
        // const {password,...others} = adduser._doc;
        await DoctorRequest.findByIdAndDelete(req.params.id);

        // others["message"] = "User registration successful!";
        // return res.status(200).json(others);
        return res.status(200).json({
          id: adduser._id,
          username: adduser.username,
          email: adduser.email,
          role: adduser.role,
          message: "Doctor registration successful!",
        });
      } catch (error) {
        return res.status(500).json({
          error: "Doctor registration failed",
        });
      }
    }
  } catch (err) {
    console.log("Inside doctor accept");
    return res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  getAllPatientRequests,
  getAllDoctorRequests,
  deleteRequest,
  acceptRequest,
};
