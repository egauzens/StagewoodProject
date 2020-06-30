import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { GET_USERNAME_QUERY } from "../queries";
import Header from "./Header";
import Landing from "./Landing";
import Register from "./Register";
import Login from "./Login";
import SecretPage from "./SecretPage";

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN);
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
		};
	}

	componentDidMount() {
		client
			.query({
				query: GET_USERNAME_QUERY,
			})
			.then((response) =>
				this.setState({ username: response.data.user.username })
			)
			.catch((error) => this.setState({ username: "" }));
	}

	onAuthChanged = (username) => {
		this.setState({ username });
	};

	render() {
		return (
			<BrowserRouter>
				<ApolloProvider client={client}>
					<div className="container">
						<Header
							username={this.state.username}
							onAuthChanged={this.onAuthChanged}
						/>
						<Route exact path="/" component={Landing}></Route>
						<Route
							exact
							path="/register"
							component={Register}></Route>
						<Route
							exact
							path="/login"
							render={(props) => (
								<Login
									{...props}
									onAuthChanged={this.onAuthChanged}
								/>
							)}></Route>
						<Route
							exact
							path="/MySuperSecretPage"
							component={SecretPage}></Route>
					</div>
				</ApolloProvider>
			</BrowserRouter>
		);
	}
}

export default App;
