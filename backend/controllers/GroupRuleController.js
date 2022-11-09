const Month = require('../models').month;
const salary_rule_belong_group_rule = require('../models').salary_rule_belong_group_rule;
const salary_rule = require('../models').salary_rule;
const salary_group_rule = require('../models').salary_group_rule;

const GroupRuleController = {

    read: async (request, response) => {
        try {
            // request.body = { attributes : [] }
            // console.log(request.body)
            let options = {};
            if (request.body.attributes) options.attributes = request.body.attributes;
            const g_rule = await salary_group_rule.findAll(options);
            await response.send(g_rule);
        } catch (err) {
            response.status(400).send(err);
        }
    },
    create: async (request, response) => {
        try {
            // request.body = { 'name', 'alias', 'description' }
            // console.log(request.body)
            const { name, alias, description } = request.body;
            const g_rule = await salary_group_rule.create({
                name: name,
                alias: alias,
                description: description,
                // createAt: new Date(),
                // updateAt: new Date()
            })
            await response.send(g_rule);
        } catch (err) {
            response.status(400).send(err);
        }
    },
    update: async (request, response) => {
        try {
            // request.body = { 'id', 'name', 'alias', 'description' }
            console.log(request.body)
            const { id } = request.body;
            const g_rule = await salary_group_rule.update(
                request.body,
                {
                    where: {
                        id: id
                    }
                });
            console.log({ g_rule });
            await response.send(g_rule);
        } catch (err) {
            response.status(400).send(err);
        }
    },
    delete: async (request, response) => {
        try {
            // request.body = { 'id' }
            // console.log(request.body)
            const [id] = [request.body.id]
            const g_rule = await salary_group_rule.destroy({
                where: {
                    id: id
                }
            });
            // console.log({g_rule});
            await response.send([g_rule]);
        } catch (err) {
            response.status(400).send(err);
        }
    },

    getBelongGroupRule: async (request, response) => {
        try {
            // request.body = {  }
            // console.log(request.body)
            const _rule = await salary_rule.findAll({
                attributes: ['id', 'name', 'alias', 'description', 'isIncome']
            });
            const _belong = await salary_rule_belong_group_rule.findAll();
            const _g_rule = await salary_group_rule.findAll({
                attributes: ['id', 'name', 'alias', 'description']
            });

            let rule = _rule.reduce((pre, cur) => {
                pre[cur.id] = cur;
                return pre;
            }, {});
            let g_rule = _g_rule.reduce((pre, cur) => {
                pre[cur.id] = cur;
                return pre;
            }, {});
            let belong = _belong.reduce((pre, cur) => {
                if (cur.salary_group_rule_id in pre) pre[cur.salary_group_rule_id].push(cur.salary_rule_id);
                else pre[cur.salary_group_rule_id] = [cur.salary_rule_id];
                return pre;
            }, {});

            await response.send({ rule, belong, g_rule });
        } catch (err) {
            response.status(400).send(err);
        }
    },

    updateGroupRuleHaveRule: async (request, response) => {
        try {
            // request.body = { rule:[], g_rule }
            console.log(request.body)
            const [rule, g_rule] = [request.body.rule, request.body.g_rule]

            await salary_rule_belong_group_rule.destroy({
                where: {
                    salary_group_rule_id: g_rule
                }
            });

            for (const element of rule) {
                await salary_rule_belong_group_rule.create({ salary_group_rule_id: g_rule, salary_rule_id: element });
            }

            const belong = await salary_rule_belong_group_rule.findAll();
            console.log({ belong })

            await response.send({ belong });
        } catch (err) {
            response.status(400).send(err);
        }
    },
    updateRuleBelongGroupRule: async (request, response) => {
        try {
            // request.body = { rule, g_rule: [] }
            // console.log(request.body)
            const [rule, g_rule] = [request.body.rule, request.body.g_rule]

            await salary_rule_belong_group_rule.destroy({
                where: {
                    salary_rule_id: rule
                }
            });

            for (const element of g_rule) {
                await salary_rule_belong_group_rule.create({ salary_group_rule_id: element, salary_rule_id: rule });
            }

            const belong = await salary_rule_belong_group_rule.findAll();

            await response.send({ belong });
        } catch (err) {
            response.status(400).send(err);
        }
    }
}

module.exports = GroupRuleController;
