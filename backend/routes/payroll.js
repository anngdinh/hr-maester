const express = require('express');
const router = express.Router();

const GroupRuleController = require("../controllers/GroupRuleController");
const RuleController = require('../controllers/RuleController');

// ######  groupRule

router.get ('/groupRule/read',   GroupRuleController.read);
router.post('/groupRule/create', GroupRuleController.create);
router.post('/groupRule/update', GroupRuleController.update);
router.post('/groupRule/delete', GroupRuleController.delete);

router.get('/groupRule/getBelongGroupRule', GroupRuleController.getBelongGroupRule);
router.post('/groupRule/updateGroupRuleHaveRule', GroupRuleController.updateGroupRuleHaveRule);
router.post('/groupRule/updateRuleBelongGroupRule', GroupRuleController.updateRuleBelongGroupRule);


// ######  rule

router.get ('/rule/read',   RuleController.read);
router.post('/rule/create', RuleController.create);
router.post('/rule/update', RuleController.update);
router.post('/rule/delete', RuleController.delete);

module.exports = router;