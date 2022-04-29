import Cookies from "universal-cookie";
import {UserInterface} from "../Interface/User";
import API from "./axios";
import axios from "axios";

export default function useRegister(): Function {


    return (username: string, password: string): Promise<any> => {
        const params = new URLSearchParams({'name': username, 'password': password});
        return API.post('user', params)
            .then(response => {
                    return true
                }
            );

    }
}