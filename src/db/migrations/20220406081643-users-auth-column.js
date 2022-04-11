module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.addColumn(
				"Users",
				"authType",
				{
					type: Sequelize.DataTypes.STRING,
				},
				{ transaction }
			);
			// await queryInterface.addIndex("Users", "password", {
			// 	fields: "password",
			// 	unique: true,
			// 	transaction,
			// });
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.removeColumn("Users", "authType", { transaction });
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
