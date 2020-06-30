import gql from "graphql-tag";

const LOGIN_MUTATION = gql`
	mutation loginMutation($username: String!, $password: String!) {
		login(input: { username: $username, password: $password }) {
			token
		}
	}
`;

const REGISTER_MUTATION = gql`
	mutation registerMutation(
		$name: String!
		$username: String!
		$email: String!
		$password: String!
	) {
		signup(
			input: {
				name: $name
				username: $username
				email: $email
				password: $password
			}
		) {
			username
		}
	}
`;

export { LOGIN_MUTATION, REGISTER_MUTATION };
