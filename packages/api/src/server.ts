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

        const accountPath: string = process.env.API_URL.replace('%s', m)

        setInterval(async () => {
            try {
                let response = await axios.get(accountPath)

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
