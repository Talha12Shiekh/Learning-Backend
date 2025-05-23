const express = require("express");
const app = express();
const PORT = 8080;

// URL ==> http://localhost:8080/demo?name=%22Talha%22&age=20&subject=%22Computer%22

app.get("/demo",(req,res) => {
    // console.log(req.query);
    res.json(req.query);
});

app.get("/demo/:name/:age/:subject",(req,res) => {
    // console.log(req.params);
    res.json(req.params);
})

app.listen(PORT,() => {
    console.log("Server listening at the port " + PORT);
})