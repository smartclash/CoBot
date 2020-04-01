import { Server } from 'http';
import * as express from 'express';
import * as socket from 'socket.io';
import WebSocket from './Socket/WebSocket';

const app: express.Express = express();
const http: Server = new Server(app);
const io: socket.Server = socket(http);

new WebSocket(io).bootstrap();

const PORT = process.env.PORT || 8080;
http.listen(PORT, () => console.log('Listening on port', PORT, 'for connections'));
