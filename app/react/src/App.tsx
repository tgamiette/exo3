import {useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.css"
import logo from './logo.svg'
import './App.css'
import Form from "./form";
import {UserInterface} from "./Interface/User";

function App() {
    const [user, setUser] = useState<UserInterface>({lastname: "init", name: "init"})


    useEffect(() => {
            // console.log(user)
            const myHeaders = new Headers();
            // myHeaders.append("Content-Type", "application/json");
            // myHeaders.append("Access-Control-Request-Method", "POST");
            // myHeaders.append("Authorization", "POST");
            // myHeaders.append("Authorization", "Basic Og==");

            const raw = JSON.stringify({
                "lastname": "tedjy",
                "name": "test"
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };

            // @ts-ignore


            // fetch("http://localhost:1234/api")
            fetch("http://localhost:1234/api/user/?name=iddddddd&lastname=idddddddddd",requestOptions)
                .then(response => {
                    console.log(response)
                    return response.text()
                })
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
        , [user])

    return (
        <div className="App">
            <Form setUser={setUser} user={user}></Form>
        </div>
    )
}

export default App
