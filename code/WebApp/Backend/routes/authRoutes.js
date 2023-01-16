const router = require("express").Router();
const {
  initialUser,
  registerUser,
  loginUser,
  logoutUser,
  refreshTokenDoctor,
} = require("../controllers/userAuthController");
const {
  initialPatient,
  registerPatient,
  loginPatient,
  logoutPatient,
  refreshTokenPatient,
} = require("../controllers/patientAuthController");

// initial admin user insertion
router.post("/mobile/initial", initialPatient);
router.post("/web/initial", initialUser);

router.post("/mobile/signup", registerPatient);
router.post("/web/signup", registerUser);

router.post("/mobile/login", loginPatient);
router.post("/web/login", loginUser);

router.post("/mobile/logout", logoutPatient);
router.post("/web/logout", logoutUser);

router.post("/mobile/refreshtoken", refreshTokenPatient);
router.post("/web/refreshtoken", refreshTokenDoctor);

module.exports = router;
