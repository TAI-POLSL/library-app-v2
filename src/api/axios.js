import axios from 'axios';

export default axios.create({
    baseURL: 'https://tai-api.azurewebsites.net'
});