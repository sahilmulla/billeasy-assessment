'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('files', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			originalFilename: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			storagePath: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			status: {
				type: Sequelize.ENUM('uploaded', 'processing', 'processed', 'failed'),
				allowNull: false,
				defaultValue: 'uploaded',
			},
			extractedData: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			uploadedAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('files');
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_files_status";'
		);
	},
};
