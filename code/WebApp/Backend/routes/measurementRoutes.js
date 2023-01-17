const router = require("express").Router();
const Measurement = require("../models/measurementModel");
const User = require("../models/Patient");
require("dotenv").config();
const authenticateToken = require("../middlewares/auth");
const { find } = require("../models/Doctor");
const { findOne } = require("../models/measurementModel");
const mongoose = require("mongoose");
const moment = require("moment");

const d = new Date();

router.post(
  // "/addGlucose/:email/:date/:value",           // don't remove this line
  "/addGlucose",
  authenticateToken,
  async (req, res) => {
    // no auth token added
    try {
      console.log("addGlucose called");
      // console.log(req.user);
      // const timestamp = new Date(2023, 1, req.params.date);              // don't remove this line
      const timestamp = new Date();
      const userByEmail = await User.findOne({ email: req.user.email });
      // const userByEmail = await User.findOne({ email: req.params.email });       // don't remove this line
      const newMeasurement = await Measurement({
        user_id: userByEmail._id,
        value: req.body.value,
        date: timestamp,
        month: timestamp.getMonth() + 1,
      });
      const measurement = await newMeasurement.save();
      return res.status(200).json({
        success: true,
        message: "Measurement added to database",
        // id: newMeasurement._id,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get("/getMonthlyGlucose/:month", authenticateToken, async (req, res) => {
  try {
    const userByEmail = await User.findOne({ email: req.user.email });

    const newMeasurements = await Measurement.find({
      month: req.params.month,
      user_id: userByEmail._id,
    });
    const concs = await newMeasurements.map((i) => `${i.value}`);
    const days = await newMeasurements.map((i) => `${i.date}`);

    var new_days = [];
    var new_concs = [];
    new_days[0] = days[0];
    new_concs[0] = concs[0];

    var k = 1;
    for (var i = 1, j = i - 1; i < days.length; i++, j++) {
      //console.log(days[i] + " " + days[j])
      if (days[i] != days[j]) {
        new_days[k] = days[i];
        new_concs[k] = concs[i];
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

router.get("/measurements/recent", authenticateToken, async (req, res) => {
  console.log("gluco called");
  const userByEmail = await User.findOne({ email: req.user.email });
  const currentTime = new Date();
  Measurement.find({ user_id: userByEmail._id, date: { $lt: currentTime } })
    .sort({ date: -1 })
    .limit(5)
    .exec()
    .then((measurements) => {
      res
        .status(200)
        .json({ records: measurements, name: userByEmail.username });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/getMonthlyValues/:email/:month", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await User.findOne({ email: userEmail });
    const month = req.params.month;
    const start = new Date(`${month}-01`);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    const currentTime = new Date();
    const measurements = await Measurement.find({
      user_id: user._id,
      date: { $gte: start, $lt: end },
    });
    const latest = await Measurement.find({
      user_id: user._id,
      date: { $lt: currentTime },
    })
      .sort({ date: -1 })
      .limit(1);
    res.json({
      monthValues: measurements.map((item) => ({
        month: item.date.getUTCMonth() + 1,
        date: item.date.getUTCDate(),
        value: item.value,
      })),
      latestValue: latest,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/measurements/:userId/:month", async (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
  //   return res.status(400).json({ message: 'Invalid user_id' });
  // }
  // if (!moment(req.params.month, 'YYYY-MM', true).isValid()) {
  //   return res.status(400).json({ message: 'Invalid month' });
  // }

  const monthNum = req.params.month;
  const startOfMonth = new Date(`${monthNum}-01`);
  const endOfMonth = new Date(
    startOfMonth.getFullYear(),
    startOfMonth.getMonth() + 1,
    0
  );
    console.log("dates created")
  // const currentTime = new Date();
  /* const latest = await Measurement.find({
    user_id: req.params.userId,
    date: { $lt: currentTime },
  })
    .sort({ date: -1 })
    .limit(1); */
  Measurement.aggregate([
    {
      $match: {
        user_id: req.params.userId,
        date: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      },
    },
    {
      $group: {
        _id: "$date",
        month: { $month: "$date" },
        // day: { $dayOfMonth: "$date" },
        // average: { $avg: "$value" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ])
    .exec()
    .then((measurements) => {
      res.status(200).json(measurements);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
