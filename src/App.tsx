import React, { useState, useEffect } from 'react';

import './App.css';
import Web3 from 'web3'

declare const web3 : any
declare const window : any

let ERC20ContractABI = [
  // balanceOf (function)
  {
    "constant": true,
    "inputs": [{"name":"_owner","type":"address"}],
    "name": "balanceOf",
    "outputs": [{"name": "","type":"uint256"}],
    "type": "function"
  },
  // transfer (function)
  {
    "constant": false,
    "inputs": [{"name": "_to","type": "address"},{"name":"_value","type":"uint256"}],
    "name": "transfer",
    "outputs": [{"name":"","type":"bool"}],
    "type": "function"
  },

  // transferFrom (function)
  {
    "constant": false,
    "inputs": [{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],
    "name": "transferFrom",
    "outputs": [{"name":"","type":"bool"}],
    "type": "function"
  },
  // Transfer (event)
  {
    "anonymous": false,
    "inputs": [{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],
    "name": "Transfer",
    "type": "event"
  },
  // name (function)
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs":[{"name":"","type":"string"}],
    "type": "function"
  },
  // symbol (function)
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name":"","type":"string"}],
    "type": "function"
  },
  // decimals (function)
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "name":"","type":"uint8"}],
    "type": "function"
  }
];
  
let NNTTokenAddress = "0x9322f28C597108769d146C82A0B4a77b070C875C";

const App = () => {
    // Detect Metamask
    const [metamaskInstalled] = useState(!!web3)
    // const [defaultAccount, setDefaultAccount] = useState()
    const [balance, setBalance] = useState()

    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)

        console.log(window.web3.currentProvider.selectedAddress);
      }
      else {
        // DO NOTHING...
      }
    }

    const getTokenBalance = (walletAddress: string) => {

      let contract = web3.eth.contract(ERC20ContractABI).at(NNTTokenAddress);
      
      web3.eth.getBalance(walletAddress, (error: any, tokenbalance: any) => {
        if (!error) {

          // decimals()
          contract.decimals((error: any, decimals: any) => {

            if (!error) {
              tokenbalance = tokenbalance.div(10**decimals);
              
                setBalance(tokenbalance.toString())
                   
            } else {
              console.warn("decimals() failed!");
            }
          })
        } else {
          console.warn("balanceOf() failed!");
        }
      });
    }
    
    const init = async () => {

      // await loadWeb3()
      web3.eth.getAccounts((error: any, accounts: any) => {
        
        // store default account for later use
        getTokenBalance(accounts[0])

      });
    }

    useEffect(() => {
      if (metamaskInstalled) {
        init()
      }
    }, [])

    

    return (
        <div className="App">
            <header className="App-header">
                <p><code>ERC20 token</code></p>

                {balance}
                {/* <Balance /> */}
            </header>
        </div>
    );
}

export default App;
