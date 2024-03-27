const express = require("express");
const route = express.Router();
const cookieJwtAuth = require("../middleware/cookieJwtAuth");
route.get("/logout", cookieJwtAuth, (req, res)=>{
    res.clearCookie("access_token");
    return res.redirect("/");
});
module.exports = route;