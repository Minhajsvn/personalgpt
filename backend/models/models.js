const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }]
});

const ConversationSchema = new mongoose.Schema({
    userId: String,
    messages: [String]
});

const User = mongoose.model('User', UserSchema);
const Conversation = mongoose.model('Conversation', ConversationSchema);


module.exports = {
    User,
    Conversation
}