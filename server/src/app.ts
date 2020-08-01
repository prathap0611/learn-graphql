import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import errorhandler from 'errorhandler';
import { ApolloServer } from 'apollo-server-express';
import { createContext } from './graphql/context';
import { resolvers } from './graphql/resolvers';
import { readFileSync } from 'fs';
import * as path from 'path';

export const typeDefs: string = readFileSync(path.join('employees.graphql'), 'utf8');

const app = express();
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler());
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext,
});
server.applyMiddleware({ app });

app.get('/', (req, res) => res.send('Hello World!'));

export default app;
