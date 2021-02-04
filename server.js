var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var port = process.env.PORT || 3000;
var http = require('http');

var index = require('./routes/index');
var todos = require('./routes/todos');

var app = express();

mongoose.connect('mongodb+srv://usermeantodo:uftU4Yb98f4HJaJg@meantodos.mhhcx.mongodb.net/meantodosdb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log("Database connection established")
})


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api/v1/', todos);

//Add Note/Submit note
app.post('/addnote', function(req,res){ 
    var note_title = req.body.note_title; 
    var note_desc = req.body.note_desc; 
    var datetime = new Date();
    // console.log(datetime);

    var data = { 
        "note_title": note_title, 
        "note_desc":note_desc,
        "note_time":datetime
    } 
    
    db.collection('meantodosdb').insertOne(data,function(err, collection){ 
        if (err){ throw err;} 
        else
        {console.log("Note Saved Successfully");} 
        
    }); 
    
    return res.redirect('/'); 
    
}) 
//Add Note/Submit note

//Remove Note/Delete note
app.post('/remove/:id',async function (req, res) {
    var getid = mongoose.Types.ObjectId(req.params.id)
    // console.log(getid);
    // let data = await db.collection('meantodosdb').deleteOne({id:req.params.id});
    await db.collection('meantodosdb').deleteOne({_id:getid},function(err, collection){ 
        if (err){ throw err;}
        else
        {
            console.log("Note Removed Successfully");
        } 
        
    }); 
    // console.log(req.params.id);
    res.redirect('/');
});
//Remove Note/Delete note

//GetEdit NoteID
// app.post('/geteditid/:id', function(req, res) {
//     var editid = req.params.id;
//     console.log("editid : " +editid);
// });
//GetEdit NoteID

//Edit Note/Update note
app.post('/editnote/:id',async function (req, res) {
    var btngetid = req.params.id; 
    console.log("btngetid: "+ btngetid);
    var note_title = req.body.note_title;
    var note_desc = req.body.note_desc;
    var date_time = new Date();
    var data = { 
        "note_title": note_title, 
        "note_desc":note_desc,
        "note_time":date_time
    }
    // console.log(data);
    var getid = mongoose.Types.ObjectId(req.params.id)
    console.log("getid: "+ getid);
    db.collection('meantodosdb').updateOne(
        { _id: getid },
        { $set: { ...data } },
        function (err) {
            if (err) { throw err; }

            else {
                console.log("Note Updated Successfully");
            }

        }); 
    // console.log(req.params.id);
    res.redirect('/');
  });
// 





app.listen(port, function(){
    console.log('Server started on port 3000...');
});
