export default class Messages {
    static readonly CONNECTING = {
        text: 'Connecting ...',
        type: 'info'
    }

    static readonly INCOMING_DATA = {
        text: 'Receiving information.',
        type: 'success'
    }

    static readonly SERVER_ERROR = {
        text: 'We have problems with the service connection. Try again later.',
        type: 'error'
    }

    static readonly INVALID_TOKEN = {
        text: 'Wrong token format.',
        type: 'error'
    }

    static readonly TOKEN_NOT_FOUND = {
        text: 'Something it´s wrong in your token, we can´t get their balance information.',
        type: 'warning'
    }

    static readonly DISCONNECTED_FROM_SERVER = {
        text: 'Disconnected from server.',
        type: 'info'
    }

}
