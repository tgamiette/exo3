import Cookies from "universal-cookie";
import API from "./axios";

export default function useGetPostFrom(): Function {

    const cookies = new Cookies();
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Access-Control-Request-Method", "GET");
    myHeaders.append('Authorization', cookies.get('jwt'));
    const requestOptions: any = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        credentials: 'include'
    };

    // return (): Promise<any> => {
    //     const url = `http://localhost:1234/api/post/`
    //     return fetch(url, requestOptions)
    //         .then(res => res.json())
    // }

    return(): Promise<any>=>{
        return API.post('post')
            .then(response => {
                    console.log(response.data);
                    return response.data
                }
            );
    }
}