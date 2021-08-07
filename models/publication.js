"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Publication extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Publication.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
				},
			});
		}
	}
	Publication.init(
		{
			userId: DataTypes.INTEGER,
			title: DataTypes.STRING,
			content: DataTypes.STRING,
			likes: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Publication",
		}
	);
	return Publication;
};
