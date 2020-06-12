class CalcController{
    constructor(){
        this._locale = "pt-BR"
        this._equalOn = false

        this._displayContentEl = document.querySelector("#content")
        this._historicEl = document.querySelector("#historic")

        this._operation = []

        //Date and Time
        this._displayDateEl = document.querySelector("#date")

        this._displayHourEl = document.querySelector("#hour")
        this._displayMinutesEl = document.querySelector("#minutes")
        this._displaySecondsEl = document.querySelector("#seconds")
        

        this.initialize()
    }

    initialize(){
        this.initButtons()

        this.getDateTimeNow()

        setInterval(() => {
            this.getDateTimeNow()
        }, 1000)

        this.clearAll()
        /*
        

        historicEl.innerHTML = "10 + 2 ="

        dateEl.innerHTML = "31/05/2020"
        hourEl.innerHTML = "08"
        minutesEl.innerHTML = "51"
        secondsEl.innerHTML = "05"

        */
         
    }

    //Utilites
    addEventListenerAll(element, events, def){
        events.split(' ').forEach(event=>{
            element.addEventListener(event, def)
        })
    }
    
    //Operation's Calculator
    setError(){
        this.displayCalcContent = 'Error'
    }
    clearEntre(){
        this._operation.pop()
        this.displayCalcContent = 0
    }

    clearAll(){
        this._operation = []
        this.displayCalcContent = 0
    }

    deleteEntry(){
        //APAGAR ULTIMA ENTRADA DE TEXTO
    }



    equal(){
        if (this._operation.length == 2){
            this.addOperation(this.displayCalcContent.innerHTML)
            this._operation[0] = eval(this._operation.join(''))
            this.displayCalcContent = this._operation[0]
        }else if(this._operation.length == 3){
            this._operation[0] = eval(this._operation.join(''))
            this.displayCalcContent = this._operation[0]
            /*
            if (this.getLastEntry() == '+' || this.getLastEntry() == '-'){
                this.displayCalcContent = eval(this._operation.join(''))
            }else{
                this.displayCalcContent = this._operation[0]
            }
            */
        }

        this._equalOn = true
    }

        
    operatorPercent(){
        console.log('porcento', this._operation)
        if (this._operation.length < 2){
            this.clearAll()
        }else if (this._operation.length == 2){
            if (this.getLastEntry() == '+' || this.getLastEntry() == '-'){
                this.addOperation(this.getFirstNumber() * this.getFirstNumber() / 100)
            }else{
                this.addOperation(this.getFirstNumber() / 100)
            }
        }else{
            this._operation[this._operation.length - 1] = this.getFirstNumber() * this.getLastEntry() / 100
            this.displayLastNumber() 
        }
    }

    getFirstNumber(){
        return this._operation[0]
    }
    getLastEntry(){
        return this._operation[this._operation.length - 1]
    }

    isOperator(value){
        return (['+', '-', '*', '/'].indexOf(value) > -1)
    }

    pushOperator(value){
        if (this._operation.length == 3){
            if (!this._equalOn){
                this._operation = [eval(this._operation.join(''))]
                this.displayLastNumber()
                this._operation.push(value)
            }else{
                this._operation = [this.displayCalcContent.innerHTML]
                this.displayLastNumber()
                this._operation.push(value)
            }
            
            
            
            
        }else{
            
            this._operation.push(value)
        }
    }

    /*[CORRIGIR AQUI]*/
    parseFloat(){
        if (this._equalOn == true){
            if(this._operation.length > 3 &&
               this._operation[this.getLastEntry()] != '.' &&
               !isNaN(this._operation)){
                console.log('linha 146', 'zoia')
                this._operation = []
            }            
            this._equalOn = false
        }
        if (this._operation.length == 0 || this._operation.length == 2){
            this._operation.push('0.') 
        }else if (this._operation.length == 1){
            if (this._operation[0].indexOf('.') == -1){
                this._operation[0] = `${this._operation[0]}.`
            }
        }else if (this._operation.length == 3){
            if (this._operation[2].indexOf('.') == -1){
                this._operation[2] = `${this._operation[2]}.`
            }
            
        }

        this.displayLastNumber()
    }

    displayHistoricEl(){
        if (this._operation.length > 1){
            this.displayHistoric = this._operation.join(" ")
        }
    }

    displayLastNumber(){
        this.displayCalcContent = this._operation[this._operation.length - 1]
    }

    addOperation(value){
        let lastIndex = this._operation.length - 1

        if (isNaN(this.getLastEntry())){
            //OPERADOR
            if(this.isOperator(value)){
                if(this.isOperator(this.getLastEntry())){
                    this._operation[lastIndex] = value
                }else if(this._operation.length > 0){
                    this.pushOperator(value)
                
                }
            }else if(!isNaN(value)){
                this._operation.push(value)
                this.displayLastNumber()
                
            }else{
                //OUTRA COISA
                
            }
        }else{
            //NÚMERO
            if(!isNaN(value)){
                console.log('linha 197', 'estou aqui!')
                if (this._equalOn){
                    console.log('linha 199', 'passei aqui!')
                    this._operation = [value]
                    this._equalOn = false
                    this.displayLastNumber()    
                }else{
                    console.log('linha 204', 'passei aqui!')
                    this._operation[lastIndex] += value
                    this.displayLastNumber()
                
                }
            }else if(this._operation.length > 0){
                this.pushOperator(value)
                
            }else{
                //OUTRA COISA
                
            }
            

        }
        
        console.log(this._operation)
    }
    
    operationBtn(value){
        switch (value){
            case 'CE':
                this.clearEntre()
                break
            
            case 'C':
                this.clearAll()
                break

            case 'Del':
                this.deleteEntry()
                break
            
            case '1/x':
                
                break

            case 'x²':
                
                break

            case 'sqr(x)':
                
                break

            case '+ | -':
                
                break

            case '=':
                this.equal()           
                break

            case '%':
                this.operatorPercent()
                break

            case '.':
                this.parseFloat()
                break

            case '+':
            case '-':
            case '*':
            case '/':
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
                this.addOperation(value)
                break

            default:
                this.setError()
                break
        }

    }


    initButtons(){
        let buttons = document.querySelectorAll("#buttons > button")

        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, 'click drag', e=>{
                let textBtn = (btn.innerHTML)
                this.operationBtn(textBtn)
            })

            this.addEventListenerAll(btn, 'mouseclick mouseover mousedown', e=>{
                btn.style.cursor = "pointer"
            })
        })
    }
    
    
    //Display Operations

    get displayCalcContent(){
        return this._displayContentEl
    }

    set displayCalcContent(value){
        this._displayContentEl.innerHTML = value
    }

    get displayHistoric(){
        return this._historicEl
    }

    set displayHistoric(value){
        this._historicEl.innerHTML = value
    }

    //Operation's Date and Time
    currentDate(){
        return new Date()
    }

    getDateTimeNow(){
        this.displayDateEl = this.currentDate().toLocaleDateString(this.locale)

        this.displayHourEl = this.currentDate().getHours()
        this.displayMinutesEl = this.currentDate().getMinutes()
        this.displaySecondsEl = this.currentDate().getSeconds()
            
    }

    lengthTimeUnity(value){
        return (value.toString().length == 1)
    }

    formatSetDT(value, display){
        if(this.lengthTimeUnity(value)){
            display.innerHTML = `0${value}`
        }else{
            display.innerHTML = value
        }
    }
    //Display Date and Time

    get displayDateEl(){
        return this._displayDateEl
    }

    set displayDateEl(value){
        this._displayDateEl.innerHTML = value
    }


    get displayHourEl(){
        return this._displayHourEl
    }

    set displayHourEl(value){
        this.formatSetDT(value, this._displayHourEl)    
    }

    get displayMinutesEl(){
        return this._displayMinutesEl
    }

    set displayMinutesEl(value){
        this.formatSetDT(value, this._displayMinutesEl)    
    }


    get displaySecondsEl(){
        return this._displaySecondsEl
    }

    set displaySecondsEl(value){
        this.formatSetDT(value, this._displaySecondsEl)    
        
    }
      

}