'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class File extends Model {
		static associate(models) {
			File.belongsTo(models.User, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
			});
		}
	}

	File.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			originalFilename: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			storagePath: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			status: {
				type: DataTypes.ENUM('uploaded', 'processing', 'processed', 'failed'),
				allowNull: false,
				defaultValue: 'uploaded',
			},
			extractedData: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			uploadedAt: {
				type: DataTypes.DATE,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
		},
		{
			sequelize,
			modelName: 'File',
			tableName: 'files',
			timestamps: false,
		}
	);

	return File;
};
