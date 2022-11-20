'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Post_tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      post_id: {
        type: Sequelize.BIGINT(20)
      },
      tag_id: {
        type: Sequelize.BIGINT(20)
      },
    
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Post_tags');
  }
};