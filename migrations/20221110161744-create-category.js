'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      parent_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(255)
      },
      meta_title: {
        type: Sequelize.STRING(255)
      },
      slug: {
        type: Sequelize.STRING(255)
      },
      content: {
        type: Sequelize.TEXT
      },
      active: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  }
};