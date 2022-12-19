const router = require("express").Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.post('/refreshtoken', refreshToken);

