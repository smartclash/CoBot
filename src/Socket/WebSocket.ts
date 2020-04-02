import * as _ from 'lodash';
import * as axios from 'axios';
import { Server, Socket } from 'socket.io';

class WebSocket {
    private io: Server;
    private socket: Socket;
    private api: axios.AxiosInstance;

    constructor(io: Server) {
        this.io = io;
        this.api = axios.default.create({
            baseURL: 'https://api.covid19india.org/data.json',
            timeout: 1000,
            headers: {
                'X-Made-By': '@xXAlphaManXx',
                'User-Agent': 'Covid19daily.Today'
            }
        });
    }

    public bootstrap(): void {
        this.io.on('connection', socket => {
            this.socket = socket;

            console.log('A new user has connected');

            socket.on('message', this.handleMessage);
            socket.on('disconnect', () => {
                console.log('A user disconnected. Memory cleaned successfully');
            })
        });
    }

    private handleMessage(response: any): void {
        switch (response.message) {
            case "1":
                this.areaUpdate(response.state);
                break;
            case "2":
                this.newsAndUpdates();
                break;
            case "3":
                this.helplineList();
                break;
            case "4":
                this.giveFeedback();
                break;
            default:
                this.unknownCommand();
        }
    }

    private sendMessage(message: any): boolean {
        return this.socket.emit('response', { message });
    }

    private sendGreetings(): boolean {
        return this.sendMessage(`
            Hey, <br />
            Welcome to COVID-19 Today. We're here to help you. Enter the number that coresponds to the action you want to perform <br />
            1) Updates about my Area <br />
            2) Latest news and updates <br />
            3) Show Helplines <br />
            4) Give feedback
        `);
    }

    private async areaUpdate(state: string): Promise<any> {
        const { data: { statewise } } = await this.api.get('/');
        const dataForState = _.find(statewise, obj => obj.state === state);

        this.sendMessage(`
            <ul>
                <li><b>Total</b> Active Cases: ${dataForState.active}</li>
                <li><b>Total</b> Confirmed Cases: ${dataForState.confirmed}</li>
                <li><b>Total</b> Deaths: ${dataForState.deaths}</li>
                <li><b>Total</b> Recovered: ${dataForState.recovered}</li>
                <li><b>Today's</b> Active Cases: ${dataForState.delta.active}</li>
                <li><b>Today's</b> Confirmed Cases: ${dataForState.delta.confirmed}</li>
                <li><b>Today's</b> Deaths: ${dataForState.delta.deaths}</li>
                <li><b>Today's</b> Recovered: ${dataForState.delta.recovered}</li>
            </ul>
        `);
    }

    private newsAndUpdates(): void {

    }

    private helplineList(): void {

    }

    private giveFeedback(): void {

    }

    private unknownCommand(): boolean {
        return this.sendMessage(`
            Sorry, <br />
            The messeage you send doesn't have any action tied to it. <br />
            Try sending a proper action message.
        `);
    }
}

export default WebSocket;
