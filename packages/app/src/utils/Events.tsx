export default class Events {
    /**
     * This event happens when a new valid token is stored from the application
     */
    static readonly NEW_TOKEN = 'newToken'

    /**
     * When the application receives messages from the server through the web socket
     */
    static readonly DATA_RECEIVED = 'newData'

    /**
     * The server fails when trying to get information from the API or whatever happens in it
     */
    static readonly SERVER_ERROR = 'error'
}
