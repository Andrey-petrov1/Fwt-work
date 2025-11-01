import axios from 'axios'
import { BASE_URL } from './constants.ts'

export const api = axios.create({
  baseURL: BASE_URL,
});
