
export default class Token {
    private _value: string

    valid: boolean
    // private _balance: Balance

    constructor(value: string = '') {
        this._value = value
        this.valid = true
        // this._balance = new Balance()
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }

    validate() {
        this.valid = !!this.value && this.value.length > 0
    }
}
