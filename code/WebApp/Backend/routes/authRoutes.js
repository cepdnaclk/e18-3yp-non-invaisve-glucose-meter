const router = require("express").Router();
const {
    initialUser,
    registerUser,
    loginUser,
    logoutUser,
    refreshToken
  } = require("../controllers/userAuthController");


// initial admin user insertion 
router.post('/initial', initialUser) 


router.post('/signup', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.post('/refreshtoken', refreshToken);


module.exports = router;