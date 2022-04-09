import react,{useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.css"
import './App.css'
import Form from "./form";
import Login from "./Login";
import {CommentInterface} from "./Interface/Comment";
import Post from "./Post";
import Cookies from 'universal-cookie';

interface CommentPropsInterface {

    comments: CommentInterface[];

}

export default function App() {
    const cookies = new Cookies();
    const [connected, setConnected] = useState<boolean>(false)
    const [comments, setComments] = useState([])
    const [list, setList] = useState([])
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

    useEffect(() => {
        fetch(`http://localhost:1234/api/post/`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                if (result.status == 200) {
                    setList(result.value)
                } else if (result.status && result.status !== 200) {
                    console.log("Lecture des com ko")
                }
            })
            .catch(error => console.log('error', error));

    }, [])

    return (
        <div className="App">
            {!connected && <Login cookies={cookies} setConnected={setConnected}/>}
            {!connected && <Form/>}
            {connected && <Post cookies={cookies}/>}

            <h1>Tout les commentaires</h1>
            {
                list.map((comment) => {
                    return (
                        <div key={comment.string}>
                            <h2>{comment.title}</h2>
                            <p>Par: {comment.author_id}<br/>Le: {}</p>
                            <p>{comment.description}</p>
                        </div>)
                })
            }
        </div>)
}

