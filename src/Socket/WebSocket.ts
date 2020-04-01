import { Server } from 'socket.io';

class WebSocket {
    private io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    public bootstrap(): void {
        this.io.on('connection', socket => {
            console.log('A new user has connected');

            socket.on('message', this.handleMessage);
            socket.on('disconnect', () => {
                console.log('A user disconnected. Memory cleaned successfully');
            })
        });
    }

    private handleMessage({ message }: any): void {
        // Get data from the api and send it back again
    }
}

export default WebSocket;
