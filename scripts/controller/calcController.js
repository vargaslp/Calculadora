class CalcController {

    constructor() {

        this._locale = 'pt-BR'
        this._displayCalcEL = document.querySelector("#display")
        this._dateEL = document.querySelector("#data")
        this._timeEL = document.querySelector("#hora")
        this.currentDate
        this.initialize()
    }

    initialize() {

        this.setDisplayDateTime()

        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000)




    }

    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale)
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)

    }


    get displayTime() {
        return this._timeEL.innerHTML
    }

    set displayTime(value) {
        this._timeEL.innerHTML = value
    }

    get displayDate() {
        return this._dateEL.innerHTML
    }

    set displayDate(value) {
        this._dateEL.innerHTML = value
    }

    get displayCalc() {
        return this._displayCalcEL.innerHTML
    }

    set displayCalc(value) {
        this._displayCalcEL.innerHTML = value
    }

    get currentDate() {
        return new Date()
    }

    set currentDate(value) {
        this._dataAtual = value
    }


}
