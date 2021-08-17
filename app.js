/**
 * @module Express Micro framework
 * @module BodyParser Body parsing middleware
 * @module Mongoose Manages the Mongodb database
 */
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressSecure = require("helmet");
const dataCleaner = require("express-mongo-sanitize");
const requestLimiter = require("express-rate-limit");
const mysql = require("mysql");
const cors = require("cors");

/**
 * @module Route Import routes
 */
const userRoutes = require("./routes/user");
const publicationRoutes = require("./routes/publication");
const commentRoutes = require("./routes/comment");

/**
 * limit each IP to 20 requests per minute
 */
const limiter = requestLimiter({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 50,
});

/**
 * Creation of the Express application
 */
const app = express();

/**
 * Configurration of the response header
 */
app.use((request, response, next) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	response.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

/**
 *
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressSecure());
app.use(dataCleaner());
app.use(limiter);
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/user", userRoutes);
app.use("/comment", commentRoutes);
app.use("/publication", publicationRoutes);

module.exports = app;
