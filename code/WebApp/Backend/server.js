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
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

/* ROUTES */

// admin routes
// app.use("/api/admin", require("./routes/adminRoutes.js"));
// user auth routes
// app.use("/api/users", require("./routes/userAuthRoutes.js"));

app.listen(port, () => console.log(`Server started on ${port}`.yellow));
