'use strict';
const { faker } = require('@faker-js/faker');
const { Book } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const books = []

    const titles = faker.helpers.uniqueArray(
      () => faker.lorem.sentence({min: 2, max: 5})
    , 30)
    
    for (let i = 0; i < 30; i++){
      books.push({
        title: titles[i],
        pages: faker.number.int({min: 10, max: 1000}),
        hardcover: Math.random() < 0.5
      })
    }
    await Book.bulkCreate(books);
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
