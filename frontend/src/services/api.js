import axios from 'axios';

const api = axios.create({baseURL: 'https://devdoido.herokuapp.com/api/'});

export default api;
