/*
 * Project: CO300 3YP
 * Github Repository: https://github.com/cepdnaclk/e18-3yp-non-invaisve-glucose-meter
 * Authors:
 *  - Kavinda Karunarathne (E/18/170)
 *  - Nethmi Ranasinghe (E/18/282)
 *  - Denuwan Weerarathne (E/18/382)
 */
const router = require('express').Router();
const {
    getAllDoctorRequests,
    getAllPatientRequests,
    deleteRequest,
    acceptRequest
} = require('../controllers/adminController')

const jwtAuth = require('../middlewares/checkAuthDoc')

// get all doctor requests
router.get('/doctorRequests', jwtAuth, getAllDoctorRequests);

// get all patient requests
router.get('/patientRequests', jwtAuth, getAllPatientRequests);

// delete requests
router.delete("/delete/:id",jwtAuth, deleteRequest);

// accept requests
router.post("/accept/:id", jwtAuth, acceptRequest);

module.exports = router;
