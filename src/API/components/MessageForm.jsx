import { useState } from 'react';

const MessageForm = ({ userID, userColor, postData }) => {
  const [form, setForm] = useState({ content: "", formId: "" });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleAddMessage = (event) => {
    event.preventDefault();
    const newMessage = { content: form.content, "userId": userID, 'userColor': userColor };
    postData(newMessage);
    setForm({ content: "" });
  }

  return (
    <form onSubmit={handleAddMessage}>
      <div className='new-message'>
        <label forhtml="content">New message</label>
        <textarea
          id="content"
          name="content"
          value={form.content}
          onChange={handleFormChange}
          required />
        <button>{'>'}</button>
      </div>
    </form>
  )
}

export default MessageForm;