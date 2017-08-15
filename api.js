var router = require('express').Router();
var _ = require('lodash');
var uuid = require("node-uuid");
var rooms = require("./public/data/rooms.json");
var messages = require("./public/data/messages.json");

router.route('/rooms')
    .get((req, res) => { res.json(rooms); })

router.param('roomId',function(req,res,next){
    next();
})
router.route('/rooms/:roomId/messages')
    .get((req, res) => {
        var roomId = req.params.roomId;
        var room = _.find(rooms, (room) => { return room.id == roomId });
        if (!room) {
            res.statusCode(404);
            return;
        }

        var msgs = messages.filter((msg) => { return msg.roomId === roomId });

        res.json({
            room: room,
            msgs: msgs
        });
    })
    .post((req, res) => {
        var newMsg = {
            "text": req.body.text,
            "roomId": req.params.roomId,
            "userId": "44f885e8-87e9-4911-973c-4074188f408a",
            "id": uuid.v4()
        }
        messages.push(newMsg);

        res.json(newMsg);
    })
    .delete((req, res) => { 
        messages =  messages.filter((msg)=>{return msg.roomId!==req.params.roomId})
        res.end("ok"); 
    })

module.exports = router;
