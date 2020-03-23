import React, {useState, useEffect} from 'react';
import './App.css';
import { Message } from './components/Message';
import Messages from './utils/Messages'
import web3Service from './services/web3.service'

const App = () => {
    const [connected, setConnected] = useState(false)
    const [message, setMessage] = useState(Messages.EMPTY)
    const [tokenValue, setTokenValue] = useState('')
    const [balance, setBalance] = useState('0')
    const [contract, setContract] = useState()

    useEffect(() => {
        web3Service.load().then(setConnected).catch((e) => {
            console.log(e)
            setMessage(Messages.NOT_INSTALLED)
        })
    }, [])

    useEffect(() => {
        if (connected && tokenValue.length > 0) {
            let isValid = web3Service.isValidAddress(tokenValue)

            if (isValid) {
                setContract(web3Service.generateContract(tokenValue))
                setMessage(Messages.TOKEN_READY)
            } else {
                setMessage(Messages.TOKEN_NOT_FOUND)
                setBalance('0')
            }
        }
    }, [tokenValue])

    useEffect(() => {
        setTimeout(() => setMessage(Messages.EMPTY), 5000)
    }, [message])
    
    useEffect(() => {
        if (connected && tokenValue.length > 0) {
            setMessage(Messages.EMPTY)

            web3Service.getBalance(contract)
                .then((balance) => setBalance(balance))
                .then(() => web3Service.subscribeEvent(contract))
                .then((subscription) => {
                    subscription.on("data", (() => {
                        web3Service.getBalance(contract).then(setBalance)
                    }))
                })
                .catch(e => {
                    console.error(e)

                })
        }

    }, [contract])

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setTokenValue(e.currentTarget.value)
    }

    const sendEther = async () => {
        web3Service.send1Ether(tokenValue)
            .then(() => setMessage(Messages.TRANSACTION_OK))
            .catch((e) => {
                console.log(e)
                setMessage(Messages.TRANSACTION_ERROR)
            })
    }

    return (
        <div className="App">
            <header className="App-header">
                <p><code>Current balance</code></p>

                <Message show={true} message={message && message.text} type={message && message.type}/>

                <input type="text" value={tokenValue} disabled={!connected} onChange={handleInputChange}/>

                <div className="btn-group">
                    <button className={'btn btn-primary waves-effect waves-light'} onClick={sendEther}>Send 1 ether
                    </button>
                </div>

                <p><small>Current Balance: </small> <b>{balance}</b></p>
            </header>
        </div>
    );
}

export default App;
