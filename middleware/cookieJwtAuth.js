const jwt = require('jsonwebtoken');
function cookieJwtAuth(req, res, next) {
    const token = req.cookies.access_token;
    try{
        const user = jwt.verify(token, process.env.MY_SECRET);
        req.user = user;
        next();
    }catch(error){
        res.clearCookie("access_token");
        return res.redirect("/");
    }
}
module.exports = cookieJwtAuth;