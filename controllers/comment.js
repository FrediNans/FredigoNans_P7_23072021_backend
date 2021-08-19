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

exports.getOneComment = (request, response) => {
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}
	models.Comment.findOne({
		where: { id: request.params.id },
		include: [
			{
				model: models.User,
				attributes: ["firstname", "lastname"],
			},
		],
	})
		.then((comment) => {
			response.status(200).json(comment);
		})
		.catch((error) => {
			console.log(error);
			response.status(500).json({ error });
		});
};

exports.modifyComment = (request, response) => {
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}
	models.Comment.findOne({
		where: { id: request.params.id },
		include: [
			{
				model: models.User,
				attributes: ["firstname", "lastname"],
			},
		],
	})
		.then((comment) => {
			comment
				.update({
					comment: request.body.comment,
				})
				.then((updatedComment) => response.status(200).json(updatedComment))
				.catch((error) => {
					response.status(500).json({ error });
				});
		})
		.catch((error) => {
			response.status(500).json({ error });
		});
};

exports.deleteComment = (request, response) => {
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}
	models.Comment.findOne({
		where: { id: request.params.id },
	})
		.then((comment) => {
			if (comment) {
				comment
					.destroy()
					.then(response.status(200).json("Commentaire supprimé !"))
					.catch((error) => response.status(404).json("Post introuvable !"));
			}
		})
		.catch((error) => {
			console.log(error);
			response.status(500).json({ error });
		});
};
