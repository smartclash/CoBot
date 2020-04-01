import { Server } from 'http';
import * as socket from 'socket.io';
import * as express from 'express';

const app: express.Express = express();
const http: Server = new Server(app);
const io: socket.Server = socket(http);

const PORT = process.env.PORT || 8080;
http.listen(PORT, () => console.log('Listening on port', PORT, 'for connections'));
