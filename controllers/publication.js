const models = require("../models");
const jwtUtils = require("../utils/jwtUtils");
const asyncLib = require("async");

// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT = 50;

exports.createPublication = (request, response) => {
	// Getting auth header
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);

	// Params
	const title = request.body.title;
	const content = request.body.content;

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

	asyncLib.waterfall(
		[
			function (done) {
				models.User.findOne({
					where: { id: userId },
				})
					.then((userFound) => {
						done(null, userFound);
					})
					.catch(function (err) {
						return response
							.status(500)
							.json(["Une erreur interne est survenue !"]);
					});
			},
			function (userFound, done) {
				if (userFound) {
					models.Publication.create({
						title: title,
						content: content,
						likes: 0,
						UserId: userFound.id,
					}).then(function (newPublication) {
						done(newPublication);
					});
				} else {
					response.status(404).json(["Utilisateur non reconnu !"]);
				}
			},
		],
		(newPublication) => {
			if (newPublication) {
				return response.status(201).json(newPublication);
			} else {
				return response.status(500).json(["Une erreur interne est survenue !"]);
			}
		}
	);
};
