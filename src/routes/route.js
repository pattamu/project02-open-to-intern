const express = require('express');
const router = express.Router();

const collegeController = require("../controller/collegeController.js");
const internController = require("../controller/internController.js");

//open-college-intern route Hndlers
router.post("/colleges", collegeController.createCollege)
router.post("/interns",internController.createIntern )
router.get("/collegeDetails", internController.getInters)

module.exports = router;