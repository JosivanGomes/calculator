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

    lengthTimeUnity(value){
        return (value.toString().length == 1)
    }
    
        
    getDateTimeNow(){
        this.displayDateEl = this.currentDate().toLocaleDateString(this.locale)

        this.displayHourEl = this.currentDate().getHours()
        this.displayMinutesEl = this.currentDate().getMinutes()
        this.displaySecondsEl = this.currentDate().getSeconds()
            
    }

    get displayCalcContent(){
        return this._displayContentEl
    }

    set displayCalcContent(value){
        this._displayContentEl.innerHTML = value
    }

    //Date and Time
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
        if(this.lengthTimeUnity(value)){
            this._displayHourEl.innerHTML = `0${value}`
        }else{
            this._displayHourEl.innerHTML = value
        }
    }

    get displayMinutesEl(){
        return this._displayMinutesEl
    }

    set displayMinutesEl(value){
        if(this.lengthTimeUnity(value)){
            this._displayMinutesEl.innerHTML = `0${value}`
        }else{
            this._displayMinutesEl.innerHTML = value
        }
    }


    get displaySecondsEl(){
        return this._displaySecondsEl
    }

    set displaySecondsEl(value){
        if(this.lengthTimeUnity(value)){
            this._displaySecondsEl.innerHTML = `0${value}`
        }else{
            this._displaySecondsEl.innerHTML = value
        }
        
    }
    currentDate(){
        return new Date()
    }

    

}