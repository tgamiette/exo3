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
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Access-Control-Request-Method", "POST");

            const raw = new URLSearchParams({'name': user.name, 'lastname': user.lastname});
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };

            // @ts-ignore
            fetch("http://localhost:1234/api/user/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.status === 200){
                        console.log("good")

                    }else {
                        console.log("pas Good")

                    }
                })
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
