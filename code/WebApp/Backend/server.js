/*
 * Project: CO300 3YP
 * Github Repository: https://github.com/cepdnaclk/e18-3yp-non-invaisve-glucose-meter
 * Authors:
 *  - Kavinda Karunarathne (E/18/170)
 *  - Nethmi Ranasinghe (E/18/282)
 *  - Denuwan Weerarathne (E/18/382)
 */
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv").config();
// const db = require("./configurations/db");
const connectDB = require("./config/db");
const port = 3000 || process.env.PORT;

const app = express();

// create/ connect with the database
connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

/* ROUTES */

// admin routes
app.use("/api/admin", require("./routes/adminRoutes.js"));
// user auth routes
// app.use("/api/auth", require("./routes/userAuth"));
app.use("/api/auth", require("./routes/authRoutes"));
// measurement routes
app.use("/api/glucose", require("./routes/measurementRoutes"));
// doctor routes
app.use("/api/doctor", require("./routes/doctorRoutes"));

app.listen(port, () => console.log(`Server started on ${port}`.yellow));
