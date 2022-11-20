'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Post_comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
     
      parent_id: {
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.BIGINT(20)
      },
      name: {
        type: Sequelize.STRING(255)
      },
      phone_number: {
        type: Sequelize.STRING(255)
      },
      email: {
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
    await queryInterface.dropTable('Post_comments');
  }
};