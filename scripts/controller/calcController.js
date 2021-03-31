class CalcController {

    constructor() {

        this._audio = new Audio('click.mp3')
        this._audioOnOff = false
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
        this.initKeyboard()
    }

    initialize() {

        this.setDisplayDateTime()

        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000)

        this.setLastNumberToDisplay()
        this.pasteFromClipboard()

        document.querySelectorAll('.btn-ac').forEach(btn => {

            btn.addEventListener('dblclick', e => {

                this.toggleAudio()
            })

        })
    }

    toggleAudio() {

        this._audioOnOff = (this._audioOnOff) ? false : true

    }

    playAudio() {

        if (this._audioOnOff) {

            this._audio.currentTime = 0
            this._audio.play()
        }

    }

    copyToClipboard() {
        let input = document.createElement('input')

        input.value = this.displayCalc

        document.body.appendChild(input)

        input.select()

        document.execCommand("Copy")

        input.remove()
    }

    pasteFromClipboard() {

        document.addEventListener('paste', e => {

            let text = e.clipboardData.getData('Text')

            this.displayCalc = parseFloat(text)

        })

    }


    initKeyboard() {

        document.addEventListener('keyup', e => {
            this.playAudio()

            
            switch (e.key) {

                case 'Escape':
                    this.clearAll()
                    break
                case 'Backspace':
                    this.clearEntry()
                    break
                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    this.addOperation(e.key)
                    break
                case 'Enter':
                case '=':
                    this.calc()
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
                    this.addOperation(parseInt(e.key))
                    break
                case 'c':
                    if (e.ctrlKey) this.copyToClipboard()
                    break
            }
        })
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

        try{
            return eval(this._operation.join(""))
        }catch(e){
            setTimeout(()=>{
                this.setError()
            },1)
        }
        
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
            
            this.pushOperation(value)
           
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

    addDot() {

        let lastOperation = this.getLastOperation()

        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return 

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.')
        } else {
            this.setLastOperation(lastOperation.toString() + '.')
        }

        this.setLastNumberToDisplay()


    }


    addEventListenerAll(element, events, fn) { 

        events.split(" ").forEach(event => {

            element.addEventListener(event, fn, false)
        })
    }

    execBtn(value) {

        this.playAudio()

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

        let buttons = document.querySelectorAll("#buttons > g, #parts > g")

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

        if(value.toString().length > 10){
            this.setError()
            return false
        }

        this._displayCalcEL.innerHTML = value
    }

    get currentDate() {
        return new Date()
    }

    set currentDate(value) {
        this._dataAtual = value
    }


}
