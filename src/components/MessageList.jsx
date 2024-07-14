


const MessageList = ({ messages }) => {
    return (
        <div>
            {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                    {msg.text}
                </div>
            ))}
        </div>
    );
};

export default MessageList;
