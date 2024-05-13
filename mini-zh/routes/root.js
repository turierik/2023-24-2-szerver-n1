const { StatusCodes } = require("http-status-codes");
const S = require("fluent-json-schema");
const db = require("../models");
const { Sequelize, sequelize } = db;
const { ValidationError, DatabaseError, Op } = Sequelize;
// TODO: Importáld a modelleket
const { Animal, Human, Food } = db;

module.exports = function (fastify, opts, next) {
    // http://127.0.0.1:4000/
    fastify.get("/", async (request, reply) => {
        reply.send({ message: "Gyökér végpont" });

        // NOTE: A send alapból 200 OK állapotkódot küld, vagyis az előző sor ugyanaz, mint a következő:
        // reply.status(200).send({ message: "Gyökér végpont" });

        // A 200 helyett használhatsz StatusCodes.OK-ot is (így szemantikusabb):
        // reply.status(StatusCodes.OK).send({ message: "Gyökér végpont" });
    });

    fastify.get("/mammals", async (request, reply) => {
        reply.send(await Animal.findAll({
            where: {
                mammal: true
            },
            order: [ ['name', 'ASC'] ]
        }))
    })

    fastify.get('/mammals-2', async (request, reply) => {
        reply.send(await Animal.findAll({
            attributes: ['name', 'chip'],
            where: { mammal: true },
            include: [ {model: Human, as: 'owner', attributes: ['name', 'contact'] }]
        }))
    })

    fastify.get('/old', async (request, reply) => {
        reply.send(await Animal.findAll({
            where: {
                age: {[Op.gt]: 10}
            }
        }))
    })

    fastify.get("/animals/:id", {
        schema: {
            params: {
                id: { type: 'integer' }
            }
        }
    }, async (request, reply) => {
        // request.params.id
        const animal = await Animal.findByPk(request.params.id)
        if (animal)
            reply.send(animal);
        else
            reply.status(404).send("NOT FOUND");
    });

    fastify.post("/humans", {
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: {type: 'string'},
                    contact: {type: 'string'},
                },
                required: ['name', 'contact']
            },
        }
    }, async (request, reply) => {
        try {
            const human = await Human.create(request.body)
            reply.status(201).send(human)
        } catch (e){
            // 500-as visszaadni nem szép dolog :)
            reply.status(400).send(e)
        }
    })

    // http://127.0.0.1:4000/auth-protected
    fastify.get("/auth-protected", { onRequest: [fastify.auth] }, async (request, reply) => {
        reply.send({ user: request.user });
    });

    next();
};

module.exports.autoPrefix = "/";
