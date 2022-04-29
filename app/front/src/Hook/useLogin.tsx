import axios from "axios";
import API from "./axios"
import Cookies from "universal-cookie";
import jose from "jose";

export default function useLogin(): Function {
    const cookies = new Cookies();

    return (username: string, password: string) => {
        var params = new URLSearchParams();
        params.append('name', password);
        params.append('password', username);


        return API.post('login', params)
            .then(response => {
                console.log(response.data)
                    cookies.set('token', response.data.token)
                    // window.sessionStorage.setItem('auhToken', response.data.token);
                    // @ts-ignore
                // axios.defaults.headers['Authorization'] = response.data.token;
                    return true

                }
            );
    }
}