module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.addColumn(
				"Tasks",
				"userId",
				{
					type: Sequelize.INTEGER,
					references: {
						model: "Users", // name of Target model
						key: "userId", // key in Target model that we're referencing
					},
					onUpdate: "CASCADE",
					onDelete: "SET NULL",
				},
				{ transaction }
			);
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.removeColumn("Tasks", "userId", { transaction });
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
