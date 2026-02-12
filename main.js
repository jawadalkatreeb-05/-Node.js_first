
const express = require('express');

const mongoose = require("mongoose");

const path = require('path');

const app = express();

const Article = require("./models/Article.js")

app.use(express.json());


const dbURI = "mongodb+srv://jawad:8817071@firstnodejscluster.l6ua9hm.mongodb.net/test?appName=FirstNodeJSCluster";

mongoose.connect(dbURI)
    .then(() =>{
    console.log("Connected successfully")
})
    .catch((error) =>{
    console.log(`Error with connecting with DB ${error}`);
});

// mongodb+srv://<db_username>:<db_password>@firstnodejscluster.l6ua9hm.mongodb.net/?appName=FirstNodeJSCluster

app.get('/hellow', (req, res) => {
    res.send('Done! Finally I can see this message!');
});


app.get('/numbers',(req,res) => {
    let numbers = "";
    for(let i=0; i <= 100;i++){
        numbers += i + " - ";
    }
    // res.send(`the numbers are :${numbers}`);
    // res.sendFile(__dirname + "/views/numbers.html")
    res.render("numbers.ejs", {
        name: "Jawad",
        numbers: numbers,
    });
});

app.get("/",(req,res)=>{
    res.send('heloooo for nothiind');
})


app.get('/findSummation/:number1/:number2',(req,res) =>{
    const num1 = req.params.number1;
    const num2 = req.params.number2;
    const total = Number(num1) + Number(num2);

    res.send(`the total is ${total}`)
})
app.get('/SayHello',(req,res) =>{
    // console.log(req.body)
    // console.log(req.query)

    // res.send(`the name is: ${req.body.name}, Age is : ${req.query.age} `);
    // res.send(`I'm trying the body`)

    res.json({
        name: req.body.name,
        age: req.body.age,
        language: "Arabic"
    })
})


app.put('/test',(req,res) => {
    res.send('hello world');
});

app.post('/addComment',(req,res) => {
    res.send('post request on addComment');
});

app.delete("/testingDelete",(req,res) =>{
    res.send('Delete request');
})

// ===== Article endpoints =====

app.post("/articles", async (req , res) =>{
    const newArticle = new Article();

    const artTitle = req.body.articleTitle ;
    const artBody = req.body.articleBody ;   
    
    newArticle.title = artTitle;
    newArticle.body = artBody;
    newArticle.NumberOfLikes = 0;
    await newArticle.save();
    res.json(newArticle);
    res.send("the new article has been stored");
})

app.get("/articles", async ( req , res ) =>{
    const articles = await Article.find();
    console.log("the articles are ",articles)
    res.json(articles);
})
app.get("/articles/:articleId", async ( req , res ) => {
    const id = req.params.articleId ;
    try{
        const article = await Article.findById(id);
        res.json(article);
        return;
    }catch(error){
        console.log("error while reading article of id ", id)
        return res.send("error") 
    }
})
app.get( "/showArticles", async ( req , res ) =>{
    const articles = await Article.find();
    res.render("articles.ejs", {
        allArticles: articles,
     });

})
    
app.listen(3000, () => {
    console.log('🚀 Server is running! Go to http://localhost:3000/hello');
});