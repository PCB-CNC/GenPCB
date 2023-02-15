import axios from 'axios';

const esp = axios.create({
    baseURL: 'http://192.168.4.1',
});

export default esp;