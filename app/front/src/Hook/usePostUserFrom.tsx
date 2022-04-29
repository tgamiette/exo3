import Cookies from "universal-cookie";
import {UserInterface} from "../Interface/User";

export default function usePostUserFrom({user}: { user: any }): Function {
    console.log(user)

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Access-Control-Request-Method", "POST");
    // @ts-ignore
    const raw = new URLSearchParams({'name': user.name, 'password': user.password});
    // @ts-ignore
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        mode: 'cors',
        credentials: 'include'
    };

    return (): Promise<any> => {
        const url = `http://localhost:1234/api/user/`
        // @ts-ignore
        return fetch(url, requestOptions)
            .then(res => res.json())
    }
}