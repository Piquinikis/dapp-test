import React, {useState, useEffect} from 'react';
import './App.css';
// import { Message } from './components/Message';
// import Messages from './utils/Messages'
import web3Service from './services/web3.service'

const App = () => {
    const [connected, setConnected] = useState(false)
    // const [message, setMessage] = useState()
    // const [showMessage, setShowMessage] = useState(false)
    const [tokenValue, setTokenValue] = useState()
    const [balance, setBalance] = useState('0')
    const [contract, setContract] = useState()

    useEffect(() => {
        web3Service.load().then(r => setConnected(r))
    }, [])

    useEffect(() => {
        if (connected) {
            let isValid = web3Service.isValidAddress(tokenValue)

            if (isValid) {
                setContract(web3Service.generateContract(tokenValue))
            }
        }
    }, [tokenValue])

    useEffect(() => {
        if (!connected) return

        web3Service.getBalance(contract)
            .then((balance) => setBalance(balance))
            .then(() => web3Service.subscribeEvent(contract))
            .then((subscription) => {
                subscription.on("data", (data => {
                    return web3Service.getBalance(contract)
                }))
            })
            .catch(e => {
                console.error(e)
            })
    }, [contract])

    // useEffect(() => {
    //     setTimeout(() => setShowMessage(!showMessage), 3000);
    // }, [message])

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setTokenValue(e.currentTarget.value)
    }

    const sendEther = async () => {
        await web3Service.send1Ether(tokenValue)
    }

    return (
        <div className="App">
            <header className="App-header">
                <p><code>Current balance</code></p>

                {/*<Message show={showMessage} message={message && message.text} type={message && message.type}/>*/}

                <input type="text" value={tokenValue} disabled={!connected} onChange={handleInputChange}/>

                <div className="btn-group">
                    <button className={'btn btn-primary waves-effect waves-light'} onClick={sendEther}>Send 1 ether
                    </button>
                </div>

                <p><small>Current Balance: </small> <b>{balance}</b> ETH</p>
            </header>
        </div>
    );
}

export default App;
