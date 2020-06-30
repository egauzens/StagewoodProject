import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class Header extends Component {
	renderAuthButtons() {
		if (!this.props.username) {
			return (
				<div>
					<Link to="/login" className="btn mx-2 my-2 my-sm-0">
						Login
					</Link>
					<Link to="/register" className="btn mx-2 my-2 my-sm-0">
						Register
					</Link>
				</div>
			);
		} else {
			return (
				<div>
					<span>Signed in as {this.props.username}</span>
					<button
						className="btn btn-danger mx-2 my-2 my-sm-0"
						onClick={() => {
							localStorage.removeItem(
								process.env.REACT_APP_AUTH_TOKEN
							);
							this.props.onAuthChanged("");
							this.props.history.push(`/`);
						}}>
						Logout
					</button>
				</div>
			);
		}
	}

	render() {
		return (
			<nav className="navbar navbar-light bg-light justify-content-between">
				<Link to="/" className="navbar-brand">
					Stagewood App
				</Link>
				<div>{this.renderAuthButtons()}</div>
			</nav>
		);
	}
}

export default withRouter(Header);
