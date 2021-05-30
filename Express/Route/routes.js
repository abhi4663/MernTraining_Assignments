const express=require('express');
var fs=require('fs');
const app=express();
const port=5000;


let books;

fs.readFile('./db.json', (err, data) => {
    if (err) {
        console.log("error");
    }
    else {
        db = JSON.parse(data);
        books = db.books;
    }
});

app.get('/',(req,res)=>{
res.send(books);
})
app
.route('/books')
.get((req,res)=>{
    
    res.send("Done2");
})
.post((req,res)=>{
    res.send("Done");
})
app
.route('/books/author')
.get((req,res)=>{
    res.send("Done1");
})
.put((req,res)=>{
    res.send("Done");
})


app.listen(port,err=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`connected to the port ${port}`);
    }
})