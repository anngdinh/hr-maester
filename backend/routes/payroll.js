const express = require('express');
const router = express.Router();

const RuleController = require('../controllers/RuleController');


// ######  rule

router.get('/rule/read', RuleController.read);
router.post('/rule/create', RuleController.create);
router.post('/rule/update', RuleController.update);
router.post('/rule/delete', RuleController.delete);

module.exports = router;