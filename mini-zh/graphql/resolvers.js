const auth = require("./auth");
const db = require("../models");
const { Sequelize, sequelize } = db;
const { ValidationError, DatabaseError, Op } = Sequelize;
// TODO: Importáld a modelleket
const { Animal, Human, Food } = db;

module.exports = {
    Query: {
        // Elemi Hello World! példa:
        helloWorld: () => "Hello World!",

        // Példa paraméterezésre:
        helloName: (_, { name }) => `Hello ${name}!`,

        // TODO: Dolgozd ki a további resolver-eket a schema-val összhangban
        animals: async () => await Animal.findAll()
    },
    Animal: {
        owner: async (animal) => await animal.getOwner()
    }
};
