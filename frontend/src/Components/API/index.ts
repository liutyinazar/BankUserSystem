import axios from 'axios'


const client = axios.create({
  baseURL: 'https://api.com/',

});

console.log(client);
