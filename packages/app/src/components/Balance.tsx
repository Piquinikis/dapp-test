import React, {FunctionComponent, createContext, useState, useContext} from 'react'
import { Message } from './Message'
import SocketService from '../utils/SocketService'
import Token from '../models/Token'
import Events from '../utils/Events'
import Messages from '../utils/Messages'

const SocketIOContext = createContext({ url: 'http://127.0.0.1:7000' });

type Response = {
    status: string,
    message: string,
    result: string
}

const Balance:FunctionComponent = () => {
    const [token, setToken] = useState(new Token(''))
    const [inputValue, setInputValue] = useState()
    const [message, setMessage] = useState(Messages.DISCONNECTED_FROM_SERVER)

    const { url } = useContext(SocketIOContext)
    const socketService = new SocketService(url)

    const handleInputChange = (e:React.FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const checkToken = () => {
        token.value = inputValue
        token.validate()

        if (token.valid) {
            setMessage(Messages.CONNECTING)

            setToken(token)

            socketService.send(Events.NEW_TOKEN, token.value)

            socketService.on(Events.DATA_RECEIVED, (response: Response) => {
                if (response.status === '0') {
                    setMessage(Messages.TOKEN_NOT_FOUND)
                }

                if (response.status === '1') {
                    setMessage(Messages.INCOMING_DATA)
                    token.balance = parseInt(response.result as string)
                }
            });

            socketService.on(Events.SERVER_ERROR, (data: any) => {
                setMessage(Messages.SERVER_ERROR)
            });
        } else {
            setMessage(Messages.INVALID_TOKEN)
        }
    }

    const cleanToken = () => {
        setInputValue('')
        setToken(new Token())

        socketService.disconnect()

        setMessage(Messages.DISCONNECTED_FROM_SERVER)
    }

    return (
        <>
            <Message show={true} message={message.text} type={message.type} />

            <input type="text" value={inputValue} onChange={handleInputChange}/>

            <div className="btn-group">
                <button className={'btn btn-primary waves-effect waves-light'} onClick={checkToken}>Lookup</button>
                <button className={'btn btn-info waves-effect waves-light'} onClick={cleanToken}>Clean</button>
            </div>

            <p><small>Current Balance: </small> <b>{token.balance}</b> ETH</p>
        </>
    )
}

export default Balance
