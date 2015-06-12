var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);




//express.js package that routes incoming get requests
app.get('/*', function(req, res){//major security flaw here, require strict routing
  var path = req._parsedUrl.pathname;

  if(path == '/'){
    res.sendFile(__dirname + "/app/index.html");    
  }else if(path == '/2' || path == '/3' ){
    res.sendFile(__dirname +"/app/index"+path.slice(1,2)+".html");    
    console.log("returning : " + "/app/index"+path.slice(1,2)+".html");
  }
  else{
    //console.log(__dirname + path.replace('/','\\'));
    //res.sendFile(__dirname + path.replace('/','\\'));  // just for windows pathname  
    console.log(__dirname + path);
    res.sendFile(__dirname + path); //for linux pathname   
  }
});

//socket.io package that handles realtime connection
io.on('connection', function(socket){


  //handles new message from the client
  socket.on('new message', function(msg){
    console.log('message typed: ' + msg.content);
    console.log('user typed: ' + msg.user_id);
    console.log('chatroom typed: ' + msg.chatroom_id);
    
      io.emit('new message', outputMsg);//broadcasts thru io

  });
});


var port = 3003;
//set the port for listening, port number requires to be in config file
http.listen(port, function(){
  console.log('listening on *:' + port);
});


