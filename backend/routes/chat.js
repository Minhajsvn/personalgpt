const express = require("express");
const { 
    addMessageToConversation, 
    createMessage, 
    postChatGPTMessage, 
    isValidateRequest,
} = require('../utils/chatgptUtils');
const authenticateJWT = require('../middleware/authJwt');
const { USER_TYPES } = require("../constants/chatgptRoles");

const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {
    if (!isValidateRequest(req)) {
        return res.status(400).send({ error: "Invalid Request" });
    }
    const { message, context, conversation = [] } = req.body;

    const contextMessage = createMessage(context, USER_TYPES.SYSTEM);
    addMessageToConversation(message, conversation, USER_TYPES.USER);

    console.log("Generating response for : \n", message);
    const chatGPTResponse = await postChatGPTMessage(
        contextMessage,
        conversation
    );
    if (!chatGPTResponse) {
        return res.status(500).send({ error: "Error with chatGPT" });
    }
    const { content } = chatGPTResponse;
    addMessageToConversation(content, conversation, USER_TYPES.ASSISTANT);

    return res.status(200).send({ message: conversation });
});

module.exports = router;
