const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {}
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'User',
			tableName: 'users',
			updatedAt: false,
			timestamps: true,
		}
	);
	return User;
};
