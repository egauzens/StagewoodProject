const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const dotEnv = require("dotenv");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const { connection } = require("./database/util");
const { verifyUser } = require("./helper/context");

dotEnv.config();

const app = express();

//connect to database
connection();

//cors
app.use(cors());
// body parser middleware
app.use(express.json());

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		verifyUser(req);
		return {
			username: req.username,
		};
	},
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server listening on PORT: ${PORT}`);
});
