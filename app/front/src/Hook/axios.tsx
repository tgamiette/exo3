import axios from 'axios';
import cookies from 'universal-cookie';

const Cookies= new cookies();
export default axios.create({
    baseURL: "http://localhost:1234/api/",
    headers: {"Content-Type": 'application/x-www-form-urlencoded'},
    withCredentials: true,
});
