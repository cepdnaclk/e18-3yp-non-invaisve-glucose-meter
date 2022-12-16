const router = require("express").Router();
const Measurement = require("../models/measurementModel");
const User = require("../models/userPatient");
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
        time: req.body.time,
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

router.get("/getMonthlyGlucose/:month",  authenticateToken, async (req, res) => {
    try {
      
      const userByEmail = await User.findOne({ email: req.user.email });
      
      const newMeasurements = await Measurement.find(
        { "month": req.params.month, "user_id" :  userByEmail._id });
        const concs = newMeasurements.map(i => `${i.value}`);
        const days = newMeasurements.map(i => `${i.date}`);
      
      return res.status(200).json({
        success: true,
        values: concs,
        dates: days,
      });
      
     
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.get("/getRecentGlucose/:date", authenticateToken, async (req, res) => {
    try {
      console.log("gluco called")
      const userByEmail = await User.findOne({ email: req.user.email });
        console.log(userByEmail)
      const newMeasurements = await Measurement.find(
        { "date": req.params.date, "user_id" :  userByEmail._id });
       // const newMeasurements = await Measurement.findAll({month: req.params.month}, { user_id: req.user.id, _id: 1 });
       
      return res.status(200).json({
        success: true,
        values: newMeasurements,
      });
      
     
    } catch (error) {
      res.status(500).json(error);
    }
  });
     


module.exports = router;