const express = require('express');
const router = express.Router();

const payrollController = require("../controllers/GroupRuleController");

router.get('/test', payrollController.test);
router.get('/getGroupRule', payrollController.getGroupRule);
router.post('/updateGroupRule', payrollController.updateGroupRule);


module.exports = router;