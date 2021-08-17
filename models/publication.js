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
			models.Publication.hasMany(models.Comment);
		}
	}
	Publication.init(
		{
			title: DataTypes.STRING,
			content: DataTypes.TEXT,
			likes: DataTypes.INTEGER,
			imageUrl: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Publication",
		}
	);
	return Publication;
};
