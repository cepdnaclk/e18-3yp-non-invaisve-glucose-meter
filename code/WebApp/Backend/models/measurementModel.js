const mongoose = require("mongoose");

const MeasurementSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
      
    },
    date: {
      type: String,
      required: true,
      
    },
    month: {
      type: String,
      required: true,
      
    },
    time: {
      type: String,
      required: true,
    }
    
  },

  // an option in mongoose
  // creates a createdAt and updatedAt field models containing timestamps which will get auto updated when model changes
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Measurement", MeasurementSchema);