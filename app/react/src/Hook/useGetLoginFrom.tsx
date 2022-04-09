
export default function useGetLoginFrom({setConnected, event}: { setConnected: any, event: any }): Function {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Access-Control-Request-Method", "POST");
    const raw = new URLSearchParams({'name': event.target?.name.value, 'password': event.target?.password.value});
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return (): Promise<any> => {
        return fetch("http://localhost:1234/api/login/", requestOptions)
            .then(response => response.json());
    }
}