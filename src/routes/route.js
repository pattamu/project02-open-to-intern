const express = require('express');
const router = express.Router();
//open-college-intern route Hndlers

const collegeController = require("../controller/collegeController.js");
const internController = require("../controller/internController.js");



router.post("/functionup/colleges", collegeController.createCollege)
router.post("/functionup/interns",internController.createIntern )


module.exports = router;