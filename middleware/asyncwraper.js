module.exports = (asyncfun)=>{
    return (req ,res , next)=>{
        asyncfun(req ,res ,next).catch((err)=>{
            next(err);

        })
    }

}