const express = require("express");
const cookieJwtAuth = require("../middleware/cookieJwtAuth");
const connection = require("../db");
const route = express.Router();
route.post("/data", cookieJwtAuth, (req, res)=>{
    let q = `INSERT INTO ${req.user.id.replaceAll("-", "")} (notes) VALUES ('${req.body.note}')`
    connection.query(q, (error, result)=>{
        if(error) throw error;
        console.log(result);
    });
});
module.exports = route;