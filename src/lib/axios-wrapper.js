import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default axios.create({
  baseURL: 'https://webexapis.com/v1',
  timeout: 10000,
  headers: { 'Authorization': `Bearer ${process.env.BOT_TOKEN}` }
});
