/*
 * Project: CO300 3YP
 * Github Repository: https://github.com/cepdnaclk/e18-3yp-non-invaisve-glucose-meter
 * Authors:
 *  - Kavinda Karunarathne (E/18/170)
 *  - Nethmi Ranasinghe (E/18/282)
 *  - Denuwan Weerarathne (E/18/382)
 */

const mongoose = require("mongoose");

const UserPatientRequestSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      contact_no: {
        type: String,
        required: true,
        default: "",
      },
      password: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: false,
        default: "",
      },
      weight: {
        type: Number,
        required: false,
        default: "",
      },
      height: {
        type: Number,
        required: false,
        default: "",
      },
      doctor_id: {
        type: Number,
        required: false,
        default: "",
      },
      // role for doctors is 3
      role: {
        type: Array,
        required: false,
        default: [3],
      },
    },
  
    // an option in mongoose
    // creates a createdAt and updatedAt field models containing timestamps which will get auto updated when model changes
    {
      timestamps: true,
    }
  );
  
  
  module.exports = mongoose.model("PatientRequest", UserPatientRequestSchema);
  