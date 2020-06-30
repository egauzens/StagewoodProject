const jwt = require("jsonwebtoken");

module.exports.verifyUser = (req) => {
	try {
		req.username = null;
		const bearerHeader = req.headers.authorization;
		if (bearerHeader) {
			const token = bearerHeader.split(" ")[1];
			const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
			req.username = payload.username;
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};
