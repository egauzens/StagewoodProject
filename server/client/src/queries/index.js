import gql from "graphql-tag";

const GET_USERNAME_QUERY = gql`
	query GetUsernameQuery {
		user {
			username
		}
	}
`;

const GET_USER_NAME_QUERY = gql`
	query GetUserNameQuery {
		user {
			name
		}
	}
`;

export { GET_USERNAME_QUERY, GET_USER_NAME_QUERY };
