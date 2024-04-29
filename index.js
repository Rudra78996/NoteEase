const express = require('express');
const app = express();
const port = process.env.PORT ;
const cookieParser = require("cookie-parser");
const cookieJwtAuth = require('./middleware/cookieJwtAuth');
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, ("public/JS"))));
app.use(express.static(path.join(__dirname, ("public/style"))));
app.use(express.static(path.join(__dirname, ("public/resource"))));
app.listen(port, ()=>{
    console.log(`app is connected to ${port}`);
});
app.use("/", require("./routes/login"));
app.use("/", require("./routes/newAccount"));
app.get("/home", cookieJwtAuth,(req, res)=>{
    let user = req.user["username"];
    return res.render("home.ejs", {user});
});
app.use("/", require("./routes/dataFetch"));
app.use("/", require("./routes/dataSaving"));
app.use("/", require("./routes/delete"));
app.use("/", require("./routes/logout"));