const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");

const User = require("../database/models/user");
const { isAuthenticated } = require("./middleware");

module.exports = {
	Query: {
		user: combineResolvers(
			isAuthenticated,
			async (_parent, _args, context) => {
				try {
					const user = await User.findOne({
						username: context.username,
					});
					if (!user) {
						throw new Error("User not found!");
					}
					return user;
				} catch (error) {
					console.log(error);
					throw error;
				}
			}
		),
	},
	Mutation: {
		signup: async (_parent, args) => {
			try {
				const user = await User.findOne({
					username: args.input.username,
				});
				if (user) {
					throw new Error("Username already in use!");
				}
				const hashedPassword = await bcrypt.hash(
					args.input.password,
					12
				);
				const newUser = new User({
					...args.input,
					password: hashedPassword,
				});
				const result = await newUser.save();
				return result;
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
		login: async (_parent, args) => {
			try {
				const user = await User.findOne({
					username: args.input.username,
				});
				if (!user) {
					throw new Error("User not found!");
				}
				const isPasswordValid = await bcrypt.compare(
					args.input.password,
					user.password
				);
				if (!isPasswordValid) {
					throw new Error("Incorrect password!");
				}
				const secret = process.env.JWT_SECRET_KEY;
				const token = jwt.sign({ username: user.username }, secret, {
					expiresIn: "1d",
				});
				return { token };
			} catch (error) {
				console.log(error);
			}
		},
	},
};
