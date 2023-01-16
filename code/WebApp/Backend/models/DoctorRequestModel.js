const mongoose = require("mongoose");

const DoctorRequestSchema = new mongoose.Schema(
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
    hospital: {
        type: String,
        required: true,
    },
    specialized_in: {
        type: String,
        required: true
    },
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


module.exports = mongoose.model("DoctorRequest", DoctorRequestSchema);
