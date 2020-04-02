import { join } from  'path';
import { Server } from 'http';
import * as express from 'express';
import * as socket from 'socket.io';
import WebSocket from './Socket/WebSocket';

const app: express.Express = express();
const http: Server = new Server(app);
const io: socket.Server = socket(http);

app.use(express.static(join(__dirname, '../', '/test/public')));
app.get('/', (_, res) => {
    res.sendFile(join(__dirname, '../', '/test/public/index.html'));
});

new WebSocket(io).bootstrap();

const PORT = process.env.PORT || 8080;
http.listen(PORT, () => console.log('Listening on port', PORT, 'for connections'));
