const router = require("express").Router();
const Measurement = require("../models/measurementModel");
const User = require("../models/Patient");
require("dotenv").config();
const authenticateToken = require("../middlewares/auth");

router.post("/addGlucose", authenticateToken, async (req, res) => { // no auth token added 
  try {
    console.log("addGlucose called")
    console.log(req)
    const newMeasurement = await Measurement({
        user_id: req.user.user_id,
        value: req.body.value,
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

router.get("/getMonthlyGlucose/:month",   authenticateToken, async (req, res) => {
    try {
      
      const userByEmail = await User.findOne({ email: req.user.email });
      
      const newMeasurements = await Measurement.find(
        { "month": req.params.month, "user_id" :  userByEmail._id });
        const concs = await newMeasurements.map(i => `${i.value}`);
        const days = await newMeasurements.map(i => `${i.date}`);
        
          var new_days = []
          var new_concs = []
          new_days[0] = days[0]
          new_concs[0] = concs[0]

          var k =1;
          for (var i = 1, j = i-1; i < days.length; i++, j++) {
            //console.log(days[i] + " " + days[j])
            if (days[i] != days[j]){
              new_days[k] = days[i]
              new_concs[k] = concs[i]
              k++;
            }
            } 
      return res.status(200).json({
        success: true,
        values: new_concs,
        dates: new_days,
        name: userByEmail.username,
      });
      
     
    } catch (error) {
      res.status(500).json(error);
    }
  });

router.get("/getRecentGlucose/:date", authenticateToken, async (req, res) => {
    try {
      console.log("gluco called")
      const userByEmail = await User.findOne({ email: req.user.email });
      
      const newMeasurements = await Measurement.find(
        { "date": req.params.date, "user_id" :  userByEmail._id });
       // const newMeasurements = await Measurement.findAll({month: req.params.month}, { user_id: req.user.id, _id: 1 });
       console.log(newMeasurements)
      return res.status(200).json({
        success: true,
        values: newMeasurements,
        name: userByEmail.username,
      });
      
     
    } catch (error) {
      res.status(500).json(error);
    }
  });
     
  router.get('/getMonthlyValues/:userId/:month', async (req, res) => {
    try {
      const userId = req.params.userId;
      const month = req.params.month;
      const start = new Date(`${month}-01`);
      const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
      const measurements = await Measurement.find({
        user_id: userId,
        date: { $gte: start, $lt: end }
      });
      res.json(measurements);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;