import React, {FunctionComponent, useState} from 'react'
import { Message } from './Message'
import Messages from '../utils/Messages'
import Web3 from 'web3'

const Balance:FunctionComponent = (props: any) => {
    const [message, setMessage] = useState(Messages.DISCONNECTED_FROM_SERVER)
    const [balance, setBalance] = useState(props.account)

    return (
        <>
            <Message show={true} message={message.text} type={message.type} />

          {balance}  
        </>
    )
}

export default Balance
