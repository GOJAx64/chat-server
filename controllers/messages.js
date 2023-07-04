const Message = require("../models/message");


const getChat = async(req, res) => {
    const myId = req.id;
    const messagesFrom = req.params.from;
    
    const last30 = await Message.find({
        $or: [
            { from: myId, to: messagesFrom },
            { from: messagesFrom, to: myId },
        ]
    }).sort({ createdAr: 'desc'}).limit(30);

}

module.exports = {
    getChat
}