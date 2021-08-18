const models = require("../models");
const jwtUtils = require("../utils/jwtUtils");

const ITEMS_LIMIT = 50;

exports.createComment = (request, response) => {
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	const data = JSON.parse(request.body.data);

	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}
	models.Comment.create({
		comment: data.comment,
		PublicationId: data.postId,
		UserId: userId,
	})
		.then((newComment) => response.status(201).json(newComment))
		.catch((error) => response.status(500).json([error]));
};

exports.getAllCommentForThisPost = (request, response) => {
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}
	const postId = request.params.id;
	const limit = parseInt(request.query.limit);
	const order = request.query.order;

	if (limit > ITEMS_LIMIT) {
		limit = ITEMS_LIMIT;
	}

	models.Comment.findAll({
		where: { PublicationId: postId },
		order: [order != null ? order.split(":") : ["id", "ASC"]],
		include: [
			{
				model: models.User,
				attributes: ["firstname", "lastname"],
			},
		],
	})
		.then(function (comments) {
			if (comments) {
				response.status(200).json(comments);
			} else {
				response.status(404).json({ error: "no comments found" });
			}
		})
		.catch(function (err) {
			console.log(err);
			response.status(500).json({ error: "invalid fields" });
		});
};
