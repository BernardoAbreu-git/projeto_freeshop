const axios = require('axios');
const credentials = { username: 'john_doe', password: 'pass123' };
axios.post('https://fakestoreapi.com/auth/login', credentials)
  .then(response => console.log(response.data));