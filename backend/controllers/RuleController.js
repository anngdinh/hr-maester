const salary_rule = require('../models').salary_rule;


const RuleController = {
    create: async (request, response) => {
        try {
            // request.body = { name, alias, isIncome, description, query }
            // console.log(request.body)
            const { name, alias, isIncome, description, query } = request.body;
            const rule = await salary_rule.create({
                name: name,
                alias: alias,
                isIncome: isIncome,
                description: description,
                query: query,
                valid: true,
                // createAt: new Date(),
                // updateAt: new Date()
            })
            await response.send(rule);
        } catch (err) {
            response.status(400).send(err);
        }
    },
    read: async (request, response) => {
        try {
            // request.body = { attributes? : [] }
            // console.log(request.body)
            let options = {};
            if (request.body.attributes) options.attributes = request.body.attributes;
            const rule = await salary_rule.findAll(options);
            await response.send(rule);
        } catch (err) {
            response.status(400).send(err);
        }
    },
    update: async (request, response) => {
        try {
            // request.body = { 'id', 'name', 'alias', 'description' }
            // console.log(request.body)
            const { id } = request.body;
            const rule = await salary_rule.update(
                request.body,
                {
                    where: {
                        id: id
                    }
                });
            // console.log({ rule });
            await response.send(rule);
        } catch (err) {
            response.status(400).send(err);
        }
    },
    delete: async (request, response) => {
        try {
            // request.body = { 'id' }
            // console.log(request.body)
            const { id } = request.body
            const g_rule = await salary_rule.destroy({
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

}

module.exports = RuleController;
