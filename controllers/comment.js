// Modules
const models = require("../models");
const jwtUtils = require("../utils/jwtUtils");

/**
 * Controller used to create comment
 * @param {*} request
 * @param {*} response
 * @returns
 */

exports.createComment = (request, response) => {
	// Getting auth header
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}

	// Params
	const data = JSON.parse(request.body.data);

	models.Comment.create({
		comment: data.comment,
		PublicationId: data.postId,
		UserId: userId,
	})
		.then((newComment) => response.status(201).json(newComment))
		.catch((error) => response.status(500).json([error]));
};

/**
 * Controller used to get one comment
 * @param {*} request
 * @param {*} response
 */

exports.getOneComment = (request, response) => {
	// Getting auth header
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

/**
 * Controller used to modify comment
 * @param {*} request
 * @param {*} response
 */

exports.modifyComment = (request, response) => {
	// Getting auth header
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

/**
 * Controller used to delete comment
 * @param {*} request
 * @param {*} response
 */

exports.deleteComment = (request, response) => {
	// Getting auth header
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
