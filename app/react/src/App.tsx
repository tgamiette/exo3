import {Dispatch, useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.css"
import './App.css'
import Form from "./form";
import Login from "./Login";
import {CommentInterface} from "./Interface/Comment";
import Post from "./Post";
import Cookies from 'universal-cookie';


function App() {
    const cookies = new Cookies();
    const [connected, setConnected] = useState(false)
    let comments = []

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Access-Control-Request-Method", "GET");
    myHeaders.append('Authorization', cookies.get('jwt'));
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        credentials: 'include'
    };

    fetch(`http://localhost:1234/api/comment/`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.status === 200) {
                comments = result.result
            } else {
                console.log("ajout du commentaire Ko")
            }
        })
        .catch(error => console.log('error', error));

    return (
        <div className="App">
            {!connected && <Login cookies={cookies} setConnected={setConnected}/>}
            {!connected && <Form/>}
            {connected && <Post cookies={cookies}/>}

            <div>
                <h1>Tout les commentaire</h1>
                {postDB !== false ?
                    postDB.map(comment => {
                        return (
                            <div>
                                <h2>{comment.title}</h2>
                                <p>Par: {comment.author}<br/>Le: {comment.date}</p>
                                <p>{comment.comment}</p>
                            </div>
                        )
                    })
                    :
                    null
                }
            </div>
        </div>


    )
}

export default App
