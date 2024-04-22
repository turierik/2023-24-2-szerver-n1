'use strict';
const { faker } = require('@faker-js/faker');
const { Book, Human, Store } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let humans = []
    for (let i = 0; i < 20; i++){
      humans.push({
        name: faker.person.fullName(),
        birthdate: faker.date.birthdate()
      })
    }
    humans = await Human.bulkCreate(humans)

    let books = []

    const titles = faker.helpers.uniqueArray(
      () => faker.lorem.sentence({min: 2, max: 5})
    , 30)
    
    for (let i = 0; i < 30; i++){
      books.push({
        title: titles[i],
        pages: faker.number.int({min: 10, max: 1000}),
        hardcover: Math.random() < 0.5,
        authorId: faker.helpers.arrayElement(humans).id // 1:N
      })
    }
    books = await Book.bulkCreate(books);

    let stores = []
    for (let i = 0; i < 10; i++){
      stores.push({
        name: faker.lorem.words(3),
        lat: faker.number.float({ min: -90, max: 90 } ),
        long: faker.number.float({ min: -180, max: 180 })
      })
    }
    stores = await Store.bulkCreate(stores)

    for (const store of stores){
      await store.setBooks( faker.helpers.arrayElements(books) ) // N:N
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
