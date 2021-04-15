const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
            'isbn': {
               type: String,
               require:true
            },
            'title': {
                type: String,
               require:true
            },
            'author':{
                type: String,
               require:true
            }, 
            'pages': {
                type: String,
               require:true
            },
            'price': {
                type: String,
               require:true
            },
            'rating':{
                type: String,
               require:true
            }, 
            "votes":{
                type: String,
               require:true
            }
})

module.exports=mongoose.model('books',bookSchema);