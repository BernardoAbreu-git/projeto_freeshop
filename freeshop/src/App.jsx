const axios = require('axios');
axios.get('https://fakestoreapi.com/products')
  .then(response => console.log(response.data));