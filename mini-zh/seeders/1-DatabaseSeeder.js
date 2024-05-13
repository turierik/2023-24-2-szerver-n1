'use strict';
const { faker } = require('@faker-js/faker');
const { Animal, Human, Food } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let humans = []
    for (let i = 0; i < 20; i++){
      humans.push({
        name: faker.person.fullName(),
        contact: faker.internet.email()
      })
    }
    humans = await Human.bulkCreate(humans)

    let animals = []

    const chips = faker.helpers.uniqueArray(
      () => faker.string.alphanumeric(16)
    , 30)

    for (let i = 0; i < 30; i++){
      animals.push({
        name: faker.person.firstName(),
        age: Math.random() < 0.2 ? null : faker.number.int({ min: 1, max: 30 }),
        mammal: Math.random() < 0.5,
        chip: chips[i],
        ownerId: faker.helpers.arrayElement(humans).id // 1:N
      })
    }
    animals = await Animal.bulkCreate(animals);

    let food = []
    for (let i = 0; i < 10; i++){
      food.push({
        name: faker.lorem.word()
      })
    }
    food = await Food.bulkCreate(food)

    for (const f of food){
      await f.setAnimals( faker.helpers.arrayElements(animals) ) // N:N
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
