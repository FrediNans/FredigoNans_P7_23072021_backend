// Modules
const models = require("../models");
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwtUtils");
const asyncLib = require("async");

/**
 * Controller used to create user
 * @param {*} request
 * @param {*} response
 */

exports.signup = (request, response, next) => {
	// Params
	const email = request.body.email;
	const firstname = request.body.firstname;
	const lastname = request.body.lastname;
	const password = request.body.password;
	const region = request.body.region;

	// Regexs
	const emailRegex = /^[^\s@]+@[^\s@]+$/;
	const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{8,}$/;

	if (
		firstname == null ||
		firstname.length < 2 ||
		lastname == null ||
		lastname.length < 2
	) {
		return response
			.status(400)
			.json(["Vos nom et prénom doivent contenir au minimum 2 caractères !"]);
	}
	if (email == null || email.length < 8 || emailRegex.test(email) != true) {
		return response
			.status(401)
			.json(["Votre email doit être au format monemail@mail.com !"]);
	}
	if (password == null || passwordRegex.test(password) != true) {
		return response
			.status(401)
			.json([
				"Votre mot de passe doit avoir minimum 8 caractères dont 1 chiffre !",
			]);
	}
	asyncLib.waterfall(
		[
			(done) => {
				models.User.findOne({
					attributes: ["email"],
					where: { email: email },
				})
					.then((userFound) => {
						done(null, userFound);
					})
					.catch((error) => {
						return response
							.status(500)
							.json(["Une erreur interne est survenue !"]);
					});
			},
			(userFound, done) => {
				if (!userFound) {
					bcrypt.hash(password, 10, (error, bcryptedPassword) => {
						done(null, userFound, bcryptedPassword);
					});
				} else {
					return response.status(409).json("Utilisateur déjà existant");
				}
			},
			(userFound, bcryptedPassword, done) => {
				const newUser = models.User.create({
					email: email,
					firstname: firstname,
					lastname: lastname,
					password: bcryptedPassword,
					region: region,
					isAdmin: 0,
				})
					.then((newUser) => {
						done(newUser);
					})
					.catch((error) => {
						return response
							.status(500)
							.json(["Une erreur interne est survenue !"]);
					});
			},
		],
		(newUser) => {
			if (newUser) {
				return response.status(201).json({
					userId: newUser.id,
				});
			} else {
				return res.status(500).json(["Une erreur interne est survenue !"]);
			}
		}
	);
};

/**
 * Controller used to login user
 * @param {*} request
 * @param {*} response
 */

exports.login = (request, response) => {
	// Params
	const email = request.body.email;
	const password = request.body.password;

	if (email == null || password == null) {
		return response.status(400).json(["Tous les champs doivent être rempli !"]);
	}
	asyncLib.waterfall(
		[
			(done) => {
				models.User.findOne({
					where: { email: email },
				})
					.then(function (userFound) {
						done(null, userFound);
					})
					.catch(function (error) {
						return response
							.status(500)
							.json(["Une erreur interne est survenue !"]);
					});
			},
			(userFound, done) => {
				if (userFound) {
					bcrypt.compare(
						password,
						userFound.password,
						(errBycrypt, resBycrypt) => {
							done(null, userFound, resBycrypt);
						}
					);
				} else {
					return response.status(404).json(["Utilisateur introuvable !"]);
				}
			},
			(userFound, resBycrypt, done) => {
				if (resBycrypt) {
					done(userFound);
				} else {
					return response.status(403).json(["Mot de passe invalide !"]);
				}
			},
		],
		(userFound) => {
			if (userFound) {
				return response.status(201).json({
					user: userFound,
					token: jwtUtils.generateTokenForUser(userFound),
				});
			} else {
				return response.status(500).json(["Une erreur interne est survenue !"]);
			}
		}
	);
};

/**
 * Controller used to get one user
 * @param {*} request
 * @param {*} response
 */

exports.getAccount = (request, response) => {
	// Getting auth header
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}

	models.User.findOne({
		attributes: ["id", "email", "firstname", "lastname", "region", "isAdmin"],
		where: { id: userId },
	})
		.then((user) => {
			if (user) {
				response.status(201).json(user);
			} else {
				response.status(404).json(["Utilisateur introuvable !"]);
			}
		})
		.catch((err) => {
			response.status(500).json("Impossible d'importer l'utilisateur !");
		});
};

/**
 * Controller used to modify user
 * @param {*} request
 * @param {*} response
 */

exports.modifyAccount = (request, response) => {
	// Getting auth header
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}

	//Params
	const firstname = request.body.firstname;
	const lastname = request.body.lastname;
	const region = request.body.region;

	asyncLib.waterfall(
		[
			(done) => {
				models.User.findOne({
					where: { id: userId },
				})
					.then((userFound) => {
						done(null, userFound);
					})
					.catch(function (err) {
						return response.status(500).json("Utilisateur introuvable !");
					});
			},
			(userFound, done) => {
				if (userFound) {
					userFound
						.update({
							firstname: firstname ? firstname : userFound.firstname,
							lastname: lastname ? lastname : userFound.lastname,
							region: region ? region : userFound.region,
						})
						.then(() => {
							done(userFound);
						})
						.catch((error) => {
							response.status(500).json("Impossible de modifier le compte !");
						});
				} else {
					response.status(404).json("Utilisateur introuvable !");
				}
			},
		],
		(userFound) => {
			if (userFound) {
				return response.status(201).json(userFound);
			} else {
				return response.status(500).json("Impossible de modifier le compte !");
			}
		}
	);
};

/**
 * Controller used to delete user
 * @param {*} request
 * @param {*} response
 */

exports.deleteAccount = (request, response) => {
	// Getting auth header
	const headerAuth = request.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	if (userId < 0) {
		return response
			.status(400)
			.json("Token expiré, merci de vous reconnecter !");
	}

	models.User.findOne({
		where: { id: request.params.id },
	})
		.then((user) => {
			if (user) {
				user
					.destroy()
					.then(response.status(201).json(user))
					.catch(response.status(404).json(["Utilisateur introuvable !"]));
			}
		})
		.catch((err) => {
			response.status(500).json("Utilisateur introuvable !");
		});
};
