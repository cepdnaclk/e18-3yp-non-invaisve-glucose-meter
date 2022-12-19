const mongoose = require("mongoose");

const UserPatientSchema = new mongoose.Schema(
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
      default: 0,
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
    doctor_id: [{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Doctor",
    }],
    role: {
      type: String,
      required: true,
      enum: ["1", "2", "3"]
    }
  },

  // an option in mongoose
  // creates a createdAt and updatedAt field models containing timestamps which will get auto updated when model changes
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Patient", UserPatientSchema);
