const express = require("express");
const route = express.Router();
const connection = require("../db");
const cookieJwtAuth = require("../middleware/cookieJwtAuth");
route.get("/data", cookieJwtAuth, (req, res)=>{
    let id = req.user.id.replaceAll("-", "");
    let q = `SELECT * FROM ${id}`;
    try{
        connection.query(q, (error, result)=>{
            if(error) throw error;
            // console.log(result);
            res.send(result);
        });
    }catch(e){
        console.log(e);
    }
});
module.exports = route;