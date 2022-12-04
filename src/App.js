import './App.css';
import { useEffect, useState } from 'react';
import { messagesAPI } from './API/api'
import { nanoid } from 'nanoid'
import MessageForm from './API/components/MessageForm';
import MessageList from './API/components/MessageList';

function App() {
  const [messages, setMessages] = useState([]);
  const [lastMessageId, setLastMessageId] = useState(0);
  const [userID, setUserID] = useState(localStorage.getItem('userID'));
  const [userColor, setUserColor] = useState(localStorage.getItem('userColor'));

  const colors = ['green', 'blue', 'yellow', 'pink'];
  const randomColor = colors[Math.floor(Math.random() * 4)];

  const fetchData = async (lastMessage) => {
    const data = await messagesAPI.getMessages(lastMessage);
      setMessages(data)
  }

  useEffect(() => {
    if(!userID) {
      let newUserID = nanoid();
      setUserID(newUserID);
      localStorage.setItem('userID', newUserID);
    }

    if(!userColor) {
      let newUserColor = randomColor;
      setUserColor(newUserColor);
      localStorage.setItem('userColor', newUserColor);
    }

    const timer = setInterval(() => {
      fetchData(lastMessageId);
    }, 1000)

    return () => clearTimeout(timer)
  }, [lastMessageId, userID, userColor, randomColor]);

  const postData = async (message) => {
    setLastMessageId(prevLastMessageId => prevLastMessageId + 1);
    await messagesAPI.addMessage(message);
  }

  return (
    <div className="App">
      <MessageList
        messages={messages}
        userID={userID}/>
      <MessageForm
        userID={userID}
        userColor={userColor}
        postData={postData}/>

    </div>
  );
}

export default App;
