import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'https://rn-tasks.firebaseio.com',
});

export default axios;