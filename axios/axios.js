import Axios from 'axios';
import { API_URL } from '../env';

const axios = Axios.create({
    baseURL: API_URL,
});

export default axios;