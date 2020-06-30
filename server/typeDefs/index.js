const { gql } = require("apollo-server-express");

module.exports = gql`
	type Query {
		user: User
	}

	type Mutation {
		signup(input: signupInput): User
		login(input: loginInput): Token
	}

	input loginInput {
		username: String!
		password: String!
	}

	input signupInput {
		name: String!
		username: String!
		email: String!
		password: String!
	}

	type Token {
		token: String!
	}

	type User {
		name: String!
		username: String!
		email: String!
	}
`;
