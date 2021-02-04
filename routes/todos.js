var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://usermeantodo:uftU4Yb98f4HJaJg@meantodos.mhhcx.mongodb.net/meantodosdb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

// const db = mongoose.connection

// db.on('error', (err) => {
//     console.log(err)
// })

// db.once('open', () => {
//     console.log("Database connection established")
// })

//get Note/fetch note


router.get('/todos', function(req, res, next){
    res.send('TODOS API');
});

module.exports = router;