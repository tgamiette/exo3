import {useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.css"
import './App.css'
import Form from "./Components/form";
import Login from "./Components/Login";
import PostForm from "./Components/PostForm";
import useGetPostFrom from "./Hook/useGetPostFrom";
import {CommentInterface} from "./Interface/Comment";

export default function App() {
    const [connected, setConnected] = useState<boolean>(false)
    const [comments, setComments] = useState([])
    const [list, setList] = useState([])
    const myHeaders = new Headers();

    const GetPost = useGetPostFrom()
    GetPost()
        .then((result: any) => {
            if (result.status == 200) {
                setList(result.value)
            } else if (result.status && result.status !== 200) {
                console.log("Lecture des com ko")
            }
        })
        // .catch((error: any) => console.log('error', error));
    return (
        <div className="App">
            {!connected && <Login setConnected={setConnected}/>}
            {!connected && <Form/>}
            {connected && <PostForm/>}

            <h1>Tout les commentaires</h1>
            {
                list.map((comment:CommentInterface) => {
                    return (
                        <div key={comment.id}>
                            <h2>{comment.title}</h2>
                            <p>Par: {comment.author_id}<br/>Le: {}</p>
                            <p>{comment.description}</p>
                        </div>)
                })
            }
        </div>)
}

