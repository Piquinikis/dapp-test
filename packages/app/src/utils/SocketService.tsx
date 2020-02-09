// @ts-ignore
import * as socketIo from 'socket.io-client'

export default class SocketService {
    private socket: socketIo

    constructor(socketURL: string) {
        this.socket = socketIo(socketURL, { reconnect: false })
    }

    public send(channel: string, message: any): void {
        this.socket.emit(channel, message);
    }

    disconnect(): void {
        this.socket.disconnect(true)
    }

    on(channel: string, callback: Function): void {
        this.socket.on(channel, callback)
    }

}
