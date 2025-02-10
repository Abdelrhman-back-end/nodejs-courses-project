class AppError extends Error{
    constructor(){
        super()
    }

    create(Message ,StatusCode , StatusText)
    {
        this.Message = Message;
        this.StatusCode = StatusCode;
        this.StatusText = StatusText;
        return this;
    }

}

module.exports = new AppError();