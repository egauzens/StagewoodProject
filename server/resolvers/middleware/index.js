const { skip } = require("graphql-resolvers");

module.exports.isAuthenticated = (_parent, _args, context) => {
	if (!context.username) {
		throw new Error("Access Denied! Please login to continue");
	}
	return skip;
};
