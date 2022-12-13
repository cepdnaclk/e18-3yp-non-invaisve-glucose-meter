const router = require("express").Router();
const Measurement = require("../models/measurementModel");
require("dotenv").config();
const authenticateToken = require("../middlewares/auth");

let refreshTokens = [];

router.post("/addGlucose", async (req, res) => { // no auth token added 
  try {
    const newMeasurement = await Measurement({
        user_id: req.body.user_id,
        value: req.body.value,
        date: req.body.date, // this depends on how the recorded time sent to the backend ?
        month: req.body.month,
        date: req.body.date,
    });
    const measurement = await newMeasurement.save();
    return res.status(200).json({
      success: true,
      message: "Measurement added to database",
    });
   
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getMonthlyGlucose/:month", async (req, res) => {
    try {
        console.log(req.params.month)
      const newMeasurements = await Measurement.find({month: req.params.month},
        { user_id: 1, _id: 1 });

       // const newMeasurements = await Measurement.findAll({month: req.params.month}, { user_id: req.user.id, _id: 1 });
       
      return res.status(200).json({
        success: true,
        values: newMeasurements,
      });
      
     
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.get("/getRecentGlucose/:date", async (req, res) => {
    try {
        console.log(req.params.date)
      const newMeasurements = await Measurement.find({date: req.params.date},
        { user_id: 1, _id: 1 });

       // const newMeasurements = await Measurement.findAll({month: req.params.month}, { user_id: req.user.id, _id: 1 });
       
      return res.status(200).json({
        success: true,
        values: newMeasurements,
      });
      
     
    } catch (error) {
      res.status(500).json(error);
    }
  });