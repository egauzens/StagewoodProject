import React, { Component } from "react";
import { GET_USER_NAME_QUERY } from "../queries";
import { Query } from "react-apollo";

class SecretPage extends Component {
	render() {
		return (
			<Query query={GET_USER_NAME_QUERY}>
				{({ loading, error, data }) => {
					if (loading) return <div>Fetching your name...</div>;
					if (error) return <div>{error.message}</div>;

					return <div>{data.user.name}'s super secret page</div>;
				}}
			</Query>
		);
	}
}

export default SecretPage;
