import axios from 'axios';

console.log(import.meta.env.PUBLIC_BOT_TOKEN)
export default axios.create({
  baseURL: 'https://webexapis.com/v1',
  timeout: 10000,
  headers: { 'Authorization': `Bearer ${import.meta.env.PUBLIC_BOT_TOKEN}` }
});
