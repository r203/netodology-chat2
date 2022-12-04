import axios from 'axios';

const instance = axios.create({
  baseURL: ' http://localhost:7777/',
});

export const messagesAPI = {
  getMessages (id) {
    return instance.get(`messages?from=${id}`,)
      .then(response => response.data)
  },

  addMessage (message) {
    return instance.post(`messages`, message)
    .then(response => response.data)
  },

}