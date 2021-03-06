// Modules
const models = require("../models");
const jwtUtils = require("../utils/jwtUtils");
const fs = require("fs");

// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = -1;
const ITEMS_LIMIT = 50;

/**
 * Controller used to create Post
 * @param {*} title
 * @param {*} content
 * @param {*} file
 */

exports.createPublication = (request, response) => {
	// Getting auth header
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}
	// Params
	const title = request.body.title;
	const content = request.body.content;
	let imgUrl = null;
	if (request.file) {
		imgUrl = `${request.protocol}://${request.get("host")}/images/${
			request.file.filename
		}`;
	}
	if (title == null || content == null) {
		return response
			.status(400)
			.json(["Le titre et le texte principale sont nécessaires !"]);
	}

	if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
		return response
			.status(400)
			.json(["Le titre et/ou le texte principale sont invalides !"]);
	}
	models.Publication.create({
		title: title,
		content: content,
		likes: 0,
		UserId: userId,
		imageUrl: imgUrl,
	})
		.then((newPublication) => response.status(201).json(newPublication))
		.catch((error) => response.status(500).json([error]));
};

/**
 * Controller used to modify Post
 * @param {*} postId
 * @param {*} request.body
 */

exports.modifyPublication = (request, response) => {
	// Getting auth header
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}

	// Params
	let post = request.body.post;
	const imageToDelete = request.body.imageToDelete;

	models.Publication.findOne({
		where: { id: request.params.id },
	})
		.then((publicationFound) => {
			if (request.file && publicationFound.imageUrl != null) {
				const filename = publicationFound.imageUrl.split("/images/")[1];
				fs.unlinkSync(`images/${filename}`);
				post = {
					...JSON.parse(request.body.post),
					imageUrl: `${request.protocol}://${request.get("host")}/images/${
						request.file.filename
					}`,
				};
			}
			if (request.file && publicationFound.imageUrl == null) {
				post = {
					...JSON.parse(request.body.post),
					imageUrl: `${request.protocol}://${request.get("host")}/images/${
						request.file.filename
					}`,
				};
			}
			if (!request.file && imageToDelete != null) {
				const filename = imageToDelete.split("/images/")[1];
				fs.unlinkSync(`images/${filename}`);
				post = {
					...JSON.parse(request.body.post),
					imageUrl: null,
				};
			}
			publicationFound
				.update({
					...post,
				})
				.then((post) => response.status(200).json(post))
				.catch((error) => response.status(400).json({ error }));
		})
		.catch((error) => {
			response.status(404).json(error);
		});
};

/**
 * Controller used to get all Posts whit table join comment and user
 * @param {*} request
 * @param {*} response
 */

exports.getAllPost = (request, response) => {
	// Getting auth header
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}

	// Params
	const fields = request.query.fields;
	const limit = parseInt(request.query.limit);
	const offset = parseInt(request.query.offset);
	const order = request.query.order;

	if (limit > ITEMS_LIMIT) {
		limit = ITEMS_LIMIT;
	}

	models.Publication.findAll({
		order: [order != null ? order.split(":") : ["id", "DESC"]],
		include: [
			{
				model: models.User,
				attributes: ["firstname", "lastname"],
			},
			{
				model: models.Comment,
				include: [
					{
						model: models.User,
						attributes: ["firstname", "lastname"],
					},
				],
			},
		],
	})
		.then((posts) => {
			if (posts) {
				response.status(200).json(posts);
			} else {
				response.status(404).json({ error: "no messages found" });
			}
		})
		.catch(function (error) {
			console.log(error);
			response.status(500).json({ error: "invalid fields" });
		});
};

/**
 * Controller used to get one Post
 * @param {*} postId
 */
exports.getOnePost = (request, response) => {
	// Getting auth header
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}

	models.Publication.findOne({
		where: {
			id: request.params.id,
		},
		include: [
			{
				model: models.User,
				attributes: ["firstname", "lastname"],
			},
			{
				model: models.Comment,
				include: [
					{
						model: models.User,
						attributes: ["firstname", "lastname"],
					},
				],
			},
		],
	})
		.then((post) => {
			if (post) {
				response.status(200).json(post);
			} else {
				response.status(404).json({ error: "no messages found" });
			}
		})
		.catch(function (err) {
			console.log(err);
			response.status(500).json({ error: "invalid fields" });
		});
};

/**
 * Controller used to delete one Post
 * @param {*} postId
 */
exports.deletePost = (request, response) => {
	// Getting auth header
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	const postId = request.params.id;
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}

	models.Publication.findOne({
		where: { id: postId },
	})
		.then((post) => {
			if (post) {
				if (post.imageUrl) {
					const filename = post.imageUrl.split("/images/")[1];
					fs.unlinkSync(`images/${filename}`);
				}
				post
					.destroy()
					.then(response.status(200).json("Post supprimé !"))
					.catch((error) => response.status(404).json("Post introuvable !"));
			}
		})
		.catch((error) => {
			response.status(404).json("Publication introuvable !");
		});
};
