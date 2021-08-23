// Imports
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SIGN_SECRET = process.env.TOKEN_KEY;

// Exported functions
module.exports = {
	generateTokenForUser: (userData) => {
		return jwt.sign(
			{
				userId: userData.id,
				isAdmin: userData.isAdmin,
			},
			JWT_SIGN_SECRET,
			{
				expiresIn: "168h",
			}
		);
	},
	parseAuthorization: (authorization) => {
		return authorization != null ? authorization.replace("Bearer ", "") : null;
	},
	getUserId: (authorization) => {
		let userId = -1;
		const token = module.exports.parseAuthorization(authorization);
		if (token != null) {
			try {
				const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
				if (jwtToken != null) {
					userId = jwtToken.userId;
				}
			} catch (error) {}
		}
		return userId;
	},
};
