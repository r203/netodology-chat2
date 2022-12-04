import { useEffect, useRef } from 'react';

const MessageList = ({ messages, userID }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <ul ref={bottomRef}>
      {
        messages.map(message => {
          return (
            <li
              key={message.id}
              className={message.userId === userID ? 'ownmessage' : ''} >
              <div style={{ backgroundColor: message.userColor }}>{message.content}</div>
            </li>
          )
        })
      }
    </ul>
  )
}

export default MessageList;