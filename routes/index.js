const { request } = require('express');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://usermeantodo:uftU4Yb98f4HJaJg@meantodos.mhhcx.mongodb.net/meantodosdb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

router.get('/',async function(req, res, next){
    try {
    // let data = await db.collection('meantodosdb').find({}).sort('note_time',-1).toArray();
    let data = await db.collection('meantodosdb').find({}, { sort: { note_time: -1 } }).toArray();
    // console.log(data);
    res.render('index',{title:'ToDo App - Designick ',data:data});
    // let currenttime = Date.now();
    // console.log(currenttime);
    }
    catch (err) {
        next(err);
      }

});


// var routes = require('./api/routes/userRoutes'); //importing route
// const productRoutes = require("./api/routes/products");
// routes(app); //register the route
// app.listen(port);
// console.log('todo list RESTful API server started on: ' + port);
// app.use(express.static(__dirname + '/assets'));
// app.use("/products", productRoutes);

module.exports = router;


