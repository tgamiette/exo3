import Cookies from "universal-cookie";

export default function usePostPosteFrom({event}:{event:Event}): Function {

    const myHeaders = new Headers();
    const cookies = new Cookies()
console.log(event.target.title.value)
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Access-Control-Request-Method", "GET");
    myHeaders.append('Authorization', cookies.get('jwt'));
    const raw = new URLSearchParams({title: event.target?.title.value, description: event.target?.description.value});
    // @ts-ignore
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        mode: 'cors',
        credentials: 'include'
    };

    return (): Promise<any> => {
        const url = `http://localhost:1234/api/post/`
        // @ts-ignore
        return fetch("http://localhost:1234/api/post/", requestOptions)
            .then(res => res.json())
    }
}