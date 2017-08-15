var uuid = require("node-uuid");
var _ = require('lodash');
var rooms = require("./public/data/rooms.json");

module.exports = function(app){
    
app.get('/hello', (req, res) => {
    res.render("index",{title:"home"});
})

app.get('/rooms', (req, res) => {
    res.render("rooms",{
        title:"rooms",
        rooms: rooms
    });
})

app.get('/rooms/add', (req, res) => {
    res.render("add");
})

app.post('/rooms/add', (req, res) => {
    var chatRoom={
        name:req.body.name,
        id: uuid.v4()
    }

    rooms.push(chatRoom);
    res.redirect("/rooms");
})

app.post('/rooms/edit/:id', (req, res) => {
    var roomid= req.params.id;

    var room = _.find(rooms,(room)=>{return room.id===roomid})

    room.name =  req.body.name;

    res.redirect("/rooms");
})

app.get('/rooms/delete/:id', (req, res) => {
    var roomid= req.params.id;

    rooms = rooms.filter(room=>{return room.id!==roomid});

    res.redirect("/rooms"); 
})

app.get('/rooms/edit/:id', (req, res) => {
    var roomid= req.params.id;

    var room = _.find(rooms,(room)=>{return room.id===roomid})

    res.render("edit",{room}); 
})
}
