import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { LOGIN_MUTATION } from "../mutations";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		};
	}

	setAuthToken = async (data, username) => {
		if (data.login) {
			const { token } = data.login;
			localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN, token);
			this.props.onAuthChanged(username);
			this.props.history.push("/MySuperSecretPage");
		}
	};

	loginUser = ({ loginMutation }) => {
		const { username, password } = this.state;
		if (username && password) {
			loginMutation();
		}
	};

	handleSubmit(e) {
		e.preventDefault();
	}

	render() {
		const { username, password } = this.state;
		return (
			<form onSubmit={this.handleSubmit} className="my-3">
				<div className="form-group">
					<label>Username</label>
					<input
						type="text"
						className="form-control"
						value={username}
						name="username"
						placeholder="username"
						onChange={(e) =>
							this.setState({ username: e.target.value })
						}
						required
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						className="form-control"
						value={password}
						name="password"
						placeholder="password"
						onChange={(e) =>
							this.setState({ password: e.target.value })
						}
						required
					/>
				</div>
				<Mutation
					mutation={LOGIN_MUTATION}
					variables={{ username, password }}
					onCompleted={(data) =>
						this.setAuthToken(data, this.state.username)
					}>
					{(loginMutation) => (
						<button
							className="btn btn-success"
							onClick={() => this.loginUser({ loginMutation })}>
							Login
						</button>
					)}
				</Mutation>
			</form>
		);
	}
}

export default Login;
