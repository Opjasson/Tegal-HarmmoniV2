'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("hotel", "contact", {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "087",
    });

    await queryInterface.addColumn("kuliner", "contact", {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "087",
    });

    await queryInterface.addColumn("wisata", "contact", {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "087",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("hotel", "contact");
    await queryInterface.removeColumn("kuliner", "contact");
    await queryInterface.removeColumn("wisata", "contact");
  }
};
