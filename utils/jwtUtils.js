// Imports
const jwt = require("jsonwebtoken");

const JWT_SIGN_SECRET = "<JWT_SIGN_TOKEN>";

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
				expiresIn: "24h",
			}
		);
	},
	parseAuthorization: (authorization) => {
		return authorization != null ? authorization.replace("Bearer ", "") : null;
	},
	getUserId: (authorization) => {
		let userId = -1;
		const token = module.exports.parseAuthorization(authorization);
		console.log(token);
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
