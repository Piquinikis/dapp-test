import React, {FunctionComponent, createContext, useState, useContext} from 'react'
import { Message } from './Message'
import SocketService from '../utils/SocketService'
import Token from '../models/Token'

const SocketIOContext = createContext({ url: 'http://127.0.0.1:7000' });

const Balance:FunctionComponent = () => {
    const [token, setToken] = useState(new Token(''))
    const [inputValue, setInputValue] = useState()
    const [message, setMessage] = useState({ show:false, text: '', type: ''})

    const { url } = useContext(SocketIOContext)
    const socketService = new SocketService(url)

    const handleInputChange = (e:React.FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const checkToken = () => {
        token.value = inputValue
        token.validate()

        if (token.valid) {
            setMessage({
                show: true,
                text: 'Connecting ...',
                type: 'info'
            })

            setToken(token)

            socketService.send("newToken", token.value)

            socketService.on("newData", (data: any) => {
                setMessage({
                    show: true,
                    text: 'Receiving information.',
                    type: 'success'
                })

                token.balance = data.result
            });

            socketService.on("error", (data: any) => {
                setMessage({
                    show: true,
                    text: 'We have problems with the service connection. Try again later.',
                    type: 'error'
                })
            });
        } else {
            setMessage({
                show: true,
                text: 'Wrong token format.',
                type: 'error'
            })
        }
    }

    const cleanToken = () => {
        setInputValue('')
        setToken(new Token())

        socketService.disconnect()

        setMessage({
            show: true,
            text: 'Disconnected from server.',
            type: 'info'
        })
    }

    return (
        <>
            <input type="text" value={inputValue} onChange={handleInputChange}/>

            <div className="btn-group">
                <button className={'btn btn-primary waves-effect waves-light'} onClick={checkToken}>Lookup</button>
                <button className={'btn btn-info waves-effect waves-light'} onClick={cleanToken}>Clean</button>
            </div>

            <Message show={message.show} message={message.text} type={message.type} />

            <p><small>Current Balance: </small> <b>{token.balance}</b> ETH</p>
        </>
    )
}

export default Balance
