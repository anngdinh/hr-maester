const export_payroll_monthly = require('../models').export_payroll_monthly;
const export_payroll_monthly_rule = require('../models').export_payroll_monthly_rule;
const export_payroll_monthly_preview = require('../models').export_payroll_monthly_preview;
const export_payroll_monthly_final = require('../models').export_payroll_monthly_final;

const calPayrollId = require('../middleware/ruleCalculator')
const dataGridPayroll = require('../middleware/dataGridPayroll')
const PayrollController = {
    create: async (request, response) => {
        try {
            // request.body = { name, month, year, [rule] }
            // console.log(request.body)
            const { name, month, year, rule } = request.body;
            const monthValue = `${year}${month}`;

            let payroll = await export_payroll_monthly.create({
                name: name,
                month: monthValue,
                canModify: true,
            })
            console.log({ payroll })

            for (const element of rule) {
                await export_payroll_monthly_rule.create({
                    export_payroll_monthly_id: payroll.id,
                    salary_rule_id: element
                });
            }

            const allRule = await export_payroll_monthly_rule.findAll({
                where: {
                    export_payroll_monthly_id: payroll.id,
                },
                // attributes: ['salary_rule_id']
            })
            const _rule = allRule.map((e) => e.dataValues.salary_rule_id)
            payroll.dataValues.rule = _rule
            // console.log({allRule})
            await calPayrollId(payroll.id)
            await response.send(payroll);
        } catch (err) {
            response.status(400).send(err);
        }
    },
    read: async (request, response) => {
        try {
            // request.body = { attributes? : [] }
            // console.log(request.body)
            const payroll = await export_payroll_monthly.findAll();
            const allRule = await export_payroll_monthly_rule.findAll()
            await response.send({ payroll, allRule });
        } catch (err) {
            response.status(400).send(err);
        }
    },
    readSingle: async (request, response) => {
        try {
            // request.body = { id }
            console.log(request.params)
            const id = request.params.payrollId
            console.log({ id })
            const payroll = await export_payroll_monthly.findAll({ where: { id: id, }, });

            const [rules, rows, columns] = await dataGridPayroll(id)
            await response.send({ payroll, rules, rows, columns });
        } catch (err) {
            response.status(400).send(err);
        }
    },
    update: async (request, response) => {
        try {
            // request.body = { id, name, month, year, [rule], canmodify }
            // console.log(request.body)
            const { id, name, month, year, rule, canModify } = request.body;
            const monthValue = `${year}${month}`;
            const allRule = await export_payroll_monthly_rule.destroy({
                where: {
                    export_payroll_monthly_id: id
                }
            });
            const payroll = await export_payroll_monthly.update(
                { name: name, month: monthValue, canModify: canModify },
                {
                    where: {
                        id: id
                    }
                });
            // console.log({ rule });
            await response.send([payroll, allRule]);
        } catch (err) {
            response.status(400).send(err);
        }
    },
    delete: async (request, response) => {
        try {
            // request.body = { 'id' }
            // console.log(request.body)
            const { id } = request.body
            const allRule = await export_payroll_monthly_rule.destroy({
                where: {
                    export_payroll_monthly_id: id
                }
            });

            const payroll = await export_payroll_monthly.destroy({
                where: {
                    id: id
                }
            });
            // console.log({g_rule});
            await response.send([g_rule, allRule]);
        } catch (err) {
            response.status(400).send(err);
        }
    },

}

module.exports = PayrollController;
