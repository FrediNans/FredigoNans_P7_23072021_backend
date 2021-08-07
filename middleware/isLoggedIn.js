const jwt = require("jsonWebToken");
const models = require("../models");
/**
 * @module TokenGenerator tokken utility
 */
require("dotenv").config();
const tokenKey = "mysuperkey";
/**
 * @module
 * Get the tokken in header of request and extract the id.
 * Get id in body of request.
 * Compare these id's and return an error if they are different.
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
module.exports = async (request, response, next) => {
	try {
		const auth = request.headers.authorization;
		if (auth) {
			const token = auth.split(" ")[1];
			const decodedToken = jwt.verify(token, tokenKey);
			const user = await models.User.findOne({
				where: { id: decodedToken.userId },
			});
			request.user = user;
		}
		next();
	} catch (e) {
		console.log(e);
		next(e);
	}
};
