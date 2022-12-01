const express = require('express');
const PayrollController = require('../controllers/PayrollController');
const router = express.Router();

const RuleController = require('../controllers/RuleController');


// ######  rule

router.get('/rule/read', RuleController.read);
router.post('/rule/create', RuleController.create);
router.post('/rule/update', RuleController.update);
router.post('/rule/delete', RuleController.delete);

router.get('/payroll/read', PayrollController.read);
router.post('/payroll/create', PayrollController.create);
router.post('/payroll/update', PayrollController.update);
router.post('/payroll/delete', PayrollController.delete);
router.get('/payroll/readSingle/:payrollId', PayrollController.readSingle);

module.exports = router;