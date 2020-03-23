import Web3 from 'web3'
import { LogsOptions, Log } from 'web3-core'
import { Subscription } from 'web3-core-subscriptions'
import { Contract } from 'web3-eth-contract'

import contractABI from '../contracts/abi.json'
import {PromiEvent, TransactionConfig, TransactionReceipt} from "web3-core";
import {TransactionRevertInstructionError} from "web3-core-helpers";

declare const window : any
declare const web3 : any

const subscribeEvent = (contract: Contract): Promise<Subscription<Log>> => {
    const options: LogsOptions = contract.events.Transfer().arguments

    return web3.eth.subscribe('logs', options);
}

const load = async(): Promise<boolean> => {
    let connected = false

    if (window.ethereum) {
        try {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()

            connected = true
        } catch (e) {

        }

    } else if (window.web3) {
        try {
            window.web3 = new Web3(window.web3.currentProvider)
            connected = true
        } catch (e) {

        }

    }

    return connected
}

const generateContract = (tokenAddress: string): Contract => {
    // Get ERC20 Token contract instance
    return new web3.eth.Contract(contractABI, tokenAddress);
}

const getBalance = async(contract: Contract): Promise<string> => {
	// Call balanceOf function
	let balance = await web3.eth.getBalance(contract.options.address)

    balance = new web3.utils.BN(balance)

    return web3.utils.fromWei(balance, 'ether')
}

const send1Ether = async(address: string): Promise<PromiEvent<TransactionReceipt | TransactionRevertInstructionError>> => {
    const accounts: [string] = await web3.eth.getAccounts()
    const config: TransactionConfig = {
        from: accounts[0],
        to: address,
        value: web3.utils.toWei(web3.utils.toBN(1))
    }

    return web3.eth.sendTransaction(config);
}

const isValidAddress = (address: string) => {
    return web3.utils.isAddress(address)
}

export default { load, generateContract, subscribeEvent, getBalance, send1Ether, isValidAddress }
