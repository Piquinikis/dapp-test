import * as dotenv from "dotenv";
import { createServer } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import axios from 'axios'

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(express.json());
app.set("port", PORT);

const server = createServer(app)
const io = socketIo(server)

io.on('connection', (socket: any) => {
    console.log('Connected client on port %s.', PORT);

    socket.on('newToken', async (m: string) => {
        console.log('[server](message): %s', JSON.stringify(m));

        setInterval(async () => {
            try {
                let response = await axios.get('https://api.tokenbalance.com/token/0xa74476443119A942dE498590Fe1f2454d7D4aC0d/0xda0aed568d9a2dbdcbafc1576fedc633d28eee9a')

                socket.emit('newData', response.data)
            } catch(e) {
                console.log(e)

                socket.emit('error', e)
            }
        }, 2000);

    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address()} :)`);
});
