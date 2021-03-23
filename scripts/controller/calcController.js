class CalcController {

    constructor() {

        this._operation = []
        this._locale = 'pt-BR'
        this._displayCalcEL = document.querySelector("#display")
        this._dateEL = document.querySelector("#data")
        this._timeEL = document.querySelector("#hora")
        this.currentDate
        this.initialize()
        this.iniButtonsEvents()
    }

    initialize() {

        this.setDisplayDateTime()

        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000)
    }

    clearAll() {
        this._operation = []

    }

    clearEntry() {
        this._operation.pop()

    }

    soma() {


    }

    divisao() {


    }

    subtracao() {

    }

    addOperation(value) {
        this._operation.push(value)
        console.log(this._operation)
    }

    setError() {
        this.displayCalc = "ERROR"
    }

    addEventListenerAll(element, events, fn) { 
        events.split(" ").forEach(event => {
            element.addEventListener(event, fn, false)
        })
    }

    execBtn(value) {

        switch (value) {

            case 'ac':
                this.clearAll()
                break
            case 'ce':
                this.clearEntry()
                break
            case 'soma':
                break
            case 'divisao':
                break
            case 'multiplicacao':
                break
            case 'subtracao':
                break
            case 'porcento':
                break
            case 'igual':
                break
            case 0:
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
                break


            default:
                this.setError()
                break
        }
    }


    iniButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g")/

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {
                let textbtn = btn.className.baseVal.replace("btn-", "")

                this.execBtn(textbtn)
            })

            this.addEventListenerAll(btn, "mouseup mouseover mousedown", e => {
                btn.style.cursor = "pointer"
            })
        })

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
