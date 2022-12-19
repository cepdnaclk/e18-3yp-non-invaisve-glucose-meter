const router = require("express").Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken
  } = require("../controllers/userAuthController");

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.post('/refreshtoken', refreshToken);


module.exports = router;