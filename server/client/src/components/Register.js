import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { REGISTER_MUTATION } from "../mutations";

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			username: "",
			password: "",
		};
	}

	validateEmail(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	registerUser = ({ registerMutation }) => {
		const { name, email, username, password } = this.state;
		if (name && username && this.validateEmail(email) && password) {
			registerMutation();
		}
	};

	handleSubmit(e) {
		e.preventDefault();
	}

	render() {
		const { name, email, username, password } = this.state;
		return (
			<form onSubmit={this.handleSubmit} className="my-3">
				<div className="form-group">
					<label>Name</label>
					<input
						className="form-control"
						value={name}
						type="text"
						name="name"
						placeholder="First Name"
						onChange={(e) =>
							this.setState({ name: e.target.value })
						}
						required
					/>
				</div>
				<div className="form-group">
					<label>E-mail</label>
					<input
						className="form-control"
						value={email}
						type="email"
						name="email"
						placeholder="E-mail"
						onChange={(e) =>
							this.setState({ email: e.target.value })
						}
						required
					/>
				</div>
				<div className="form-group">
					<label>Username</label>
					<input
						value={username}
						className="form-control"
						type="text"
						name="username"
						placeholder="Username"
						onChange={(e) =>
							this.setState({ username: e.target.value })
						}
						required
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input
						value={password}
						className="form-control"
						type="password"
						name="password"
						placeholder="Password"
						onChange={(e) =>
							this.setState({ password: e.target.value })
						}
						required
					/>
				</div>
				<Mutation
					mutation={REGISTER_MUTATION}
					variables={{ name, username, email, password }}
					onCompleted={() => this.props.history.push("/")}>
					{(registerMutation) => (
						<button
							className="btn btn-success"
							onClick={() =>
								this.registerUser({ registerMutation })
							}>
							Register
						</button>
					)}
				</Mutation>
			</form>
		);
	}
}

export default Register;
