const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;

const readedquotes = JSON.parse(fs.readFileSync("quotes.json","utf-8"));
const quotes = readedquotes.quotes;

app.use(express.json());


app.get("/quotes",(req,res) => {
    res.json(quotes);
});

app.get("/quotes/:id",(req,res) => {
    const findedproduct = quotes.find(p => p.id === +req.params.id);
    res.json(findedproduct);
});

app.post("/quotes",(req,res) => {
    const datatopost = req.body;
    quotes.push(datatopost);
    res.json(datatopost);
});

app.put("/quotes/:id",(req,res) => {
    const updateid = +req.params.id;
    const datatoupdateindex = quotes.findIndex(q => q.id == updateid);
    quotes[datatoupdateindex] = {...req.body,id:updateid};
    res.json({item:"updated"});
});

app.delete("/quotes/:id",(req,res) => {
    const deleteid = +req.params.id;
    const deleteIndex = quotes.findIndex(q => q.id == deleteid);
    quotes.splice(deleteIndex,1);
    res.json({item:"deleted"});
});

app.listen(PORT,() => {
    console.log(`Server listening at the port ${PORT}`);
})