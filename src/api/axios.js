import axios from 'axios';

export default axios.create({
    // baseURL: 'https://localhost:44319'
    // baseURL: 'https://tai-api.azurewebsites.net'
    baseURL: 'https://libraryappapideploy.azurewebsites.net'
});