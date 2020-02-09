export default class Balance {
    // accountAddress: string
    // contractAdrress: string

    snapshotDate: Date
    block: number
    tokenQuantity: {value: number, unitOfMeasure: string}

    constructor(snapshotDate: Date, block: number, tokenQuantity: { value: number; unitOfMeasure: "USDT" }) {
        this.snapshotDate = snapshotDate;
        this.block = block;
        this.tokenQuantity = tokenQuantity;
    }
}
