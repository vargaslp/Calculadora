class CalcController {

    constructor() {

        this._lastOperator = ''
        this._lastNumber = ''

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

        this.setLastNumberToDisplay()
    }

    clearAll() {
        this._operation = []
        this._lastNumber = []
        this._lastOperator = []
        this.setLastNumberToDisplay()

    }

    clearEntry() {
        this._operation.pop()
        this.setLastNumberToDisplay()

    }

    soma() {


    }

    divisao() {


    }

    subtracao() {

    }

    getLastOperation() {
        return this._operation[this._operation.length - 1]
    }
    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value
    }

    isOperator(value) {
        return (["+", "-", "*", "%", "/"].indexOf(value) > -1)
    }

    pushOperation(value) {

        this._operation.push(value)

        if (this._operation.length > 3) {

            this.calc()
        }

    }

    getResult() {

        return eval(this._operation.join(""))
    }

    calc() {

        let last = ''


        if (this._operation.length < 3) {
            let firtItem = this._operation[0]

            this._operation = [firtItem, this._lastOperator, this._lastNumber]


        }
        if (this._operation.length > 3) {
            last = this._operation.pop()

            this._lastOperator = this.getLastItem()
            this._lastNumber = this.getResult()
        } else if (this._operation.length == 3) {

            this._lastOperator = this.getLastItem()
            this._lastNumber = this.getLastItem(false)


        }

        let result = this.getResult()


        if (last == '%') {

            result = result / 100
            this._operation = [result]

        } else {

            this._operation = [result]
            if (last) this._operation.push(last)

        }
        this.setLastNumberToDisplay()

    }

    getLastItem(isOperator = true) {

        let lastIntem

        for (let i = this._operation.length - 1; i >= 0; i--) {

           

            if (this.isOperator(this._operation[i]) == isOperator) {
                lastIntem = this._operation[i]
                break
            }
         
        }

        if (!lastIntem) {
            lastIntem = (isOperator) ? this._lastOperator : this._lastNumber
        }

        return lastIntem
    }


    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false)

        if (!lastNumber) lastNumber = 0

        this.displayCalc = lastNumber

    }


    addOperation(value) {


        if (isNaN(this.getLastOperation())) {
            if (this.isOperator(value)) {
                this.setLastOperation(value)

            } else {

                this.pushOperation(value)
                this.setLastNumberToDisplay()


            }


        } else if (this.isOperator(value)) {
           
            this.pushOperation(value
        } else {
            let newValue = this.getLastOperation().toString() + value.toString()
            this.setLastOperation(newValue)

            this.setLastNumberToDisplay()

           

        }

        console.log(this._operation)
    }

    setError() {
        this.displayCalc = "ERROR"
    }

    addDot(){

        let lastOperation = this.getLastOperation()

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return 

        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.')
        }else {
            this.setLastOperation(lastOperation.toString()+ '.')
        }

        this.setLastNumberToDisplay()


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
                this.addOperation('+')

                break
            case 'divisao':
                this.addOperation('/')

                break
            case 'multiplicacao':
                this.addOperation('*')

                break
            case 'subtracao':
                this.addOperation('-')

                break
            case 'porcento':
                this.addOperation('%')

                break
            case 'igual':
                this.calc()
                break
            case 'ponto':
                this.addDot('.')

                break

            case '0':
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
