const models = require("../models");
const jwtUtils = require("../utils/jwtUtils");

exports.createComment = (request, response) => {
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}
	models.Comment.create({
		Comment: request.body.comment,
		PostId: request.body.postId,
		UserId: userId,
	})
		.then((newComment) => response.status(201).json(newComment))
		.catch((error) => response.status(500).json([error]));
};
