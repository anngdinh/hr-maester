const Month = require('../models').month;
const salary_rule_belong_group_rule = require('../models').salary_rule_belong_group_rule;
const salary_rule = require('../models').salary_rule;
const salary_group_rule = require('../models').salary_group_rule;

const groupRuleController = {

    test: async (request, response) => {},

    getGroupRule: async (request, response) => {
        const rule = await salary_rule.findAll({
            attributes: ['id', 'name', 'alias', 'description', 'isIncome']
        });
        const belong = await salary_rule_belong_group_rule.findAll();
        const g_rule = await salary_group_rule.findAll({
            attributes: ['id', 'name', 'alias', 'description']
        });

        try {
            await response.send({ rule, belong, g_rule });
        } catch (err) {
            response.status(400).send(err);
        }
    },

    updateGroupRule: async (request, response) => {
        const [rule, g_rule] = [request.body.rule, request.body.g_rule]

        await salary_rule_belong_group_rule.destroy({
            where: {
                salary_group_rule_id: g_rule
            }
        });

        rule.forEach(async element => {
            salary_rule_belong_group_rule.create({salary_group_rule_id: g_rule, salary_rule_id: element})
        });

        const belong = await salary_rule_belong_group_rule.findAll();

        try {
            await response.send({ belong });
        } catch (err) {
            response.status(400).send(err);
        }
    }
}

module.exports = groupRuleController;
