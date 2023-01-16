const mongoose = require("mongoose");

const MeasurementSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    value: {
      type: Number,
      required: true,
      
    },
    date: {
      type: Date,
      required: true
    },
    month: {
      type: Number,
      required: true,
      
    },
    time: {
      type: String,
      required: false,
    },
    
  },

  // an option in mongoose
  // creates a createdAt and updatedAt field models containing timestamps which will get auto updated when model changes
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Measurement", MeasurementSchema);