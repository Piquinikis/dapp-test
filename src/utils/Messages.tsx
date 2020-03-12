export default class Messages {
    static readonly CONNECTING = {
        text: 'Getting information ...',
        type: 'info'
    }

    static readonly NOT_INSTALLED = {
        text: 'Metamask not installed.',
        type: 'error'
    }
    
    static readonly TRANSACTION_OK = {
        text: 'The transaction has finished successfully.',
        type: 'success'
    }
    
    static readonly TRANSACTION_ERROR = {
        text: 'The processing of the transaction has failed..',
        type: 'error'
    }

    static readonly TOKEN_NOT_FOUND = {
        text: 'Something it´s wrong in your token, we can´t get their balance information.',
        type: 'warning'
    }

}
