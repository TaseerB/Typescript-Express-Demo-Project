"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Tasks", {
			taskId: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			taskName: {
				type: Sequelize.STRING,
			},
			taskDetail: {
				type: Sequelize.STRING,
			},
			attachment: {
				type: Sequelize.STRING,
			},
			taskStatus: {
				type: Sequelize.STRING,
			},
			completionTime: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Tasks");
	},
};
