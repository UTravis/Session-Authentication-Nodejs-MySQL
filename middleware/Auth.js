module.exports = async (req, res, next) => {
    //Checking the request for session data
    if(req.session.isAuth){
        if(req.session.user !== null){
            req.userID = req.session.user.id; //passing data to the request
            next()
        }
    }else{
        res.status(404).redirect('/login')
    }
}