
export default class Token {
    private _value: string
    private _balance: number

    valid: boolean

    constructor(value: string = '') {
        this._value = value
        this.valid = true
        this._balance = 0
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }


    get balance(): number {
        return this._balance/1000000000000000000;
    }

    set balance(value: number) {
        this._balance = value;
    }

    validate() {
        this.valid = !!this.value && this.value.length > 0
    }
}
