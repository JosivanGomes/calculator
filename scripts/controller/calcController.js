class CalcController{
    constructor(){
        this._locale = "pt-BR"

        this._displayContentEl = document.querySelector("#content")

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

        /*
        let historicEl = document.querySelector("#historic")

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
    initButtons(){
        let buttons = document.querySelectorAll("#buttons > button")

        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, 'click drag', e=>{
                console.log(btn.innerHTML)
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