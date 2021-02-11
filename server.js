var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require ('path')
var app = express()
var PORT = process.env.PORT ||3000;
var notes = require('./db/db.json');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/notes.html"));
});

app.get('/api/notes', function(req,res) {
  res.sendFile(path.join(__dirname, "db/db.json"))
})

app.post('/api/notes',function(req,res) { 
  notes.push(req.body)
  var newnotes = notes
  console.log(newnotes)
  fs.writeFile("./db/db.json", JSON.stringify(newnotes), ()=>{

  })
})
app.delete('/api/notes/:title',function(req,res) { 
  //notes.push(req.body)
  //var newnotes = notes
   var removing = req.params.title
   var keep = notes.filter(note => note.title != removing)
   console.log(keep)
   fs.writeFile("./db/db.json",JSON.stringify(keep),()=>{
     
   })

 
  //fs.writeFile("./db/db.json", JSON.stringify(newnotes), ()=>{

 // })
})
app.listen(PORT, function(){
    console.log('server listening on: http://localhost:' + PORT)
})





