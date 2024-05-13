'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('AnimalFood', {
      AnimalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'animals',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      FoodId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'food',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    })
    await queryInterface.addConstraint('AnimalFood', {
      type: 'primary key',
      fields: ['AnimalId', 'FoodId']
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
