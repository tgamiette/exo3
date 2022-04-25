import {useEffect, useState} from 'react'
// import "bootstrap/dist/css/bootstrap.css"
import './App.scss'
import Form from "./Components/form";
import Login from "./Components/Login";
import PostForm from "./Components/PostForm";
import useGetPostFrom from "./Hook/useGetPostFrom";
import {CommentInterface} from "./Interface/Comment";
import Cookies from "universal-cookie";

export default function App() {
    const [connected, setConnected] = useState<boolean>(false)
    const [comments, setComments] = useState<CommentInterface>([])
    const [list, setList] = useState([])
    const myHeaders = new Headers();

    useEffect(() => {
        const GetPost = useGetPostFrom()
        GetPost()
            .then((result: any) => {
                console.log(result, new Cookies().get('jwt'))
                if (result.status == 200) {
                    setList(result.value)
                    console.log("Lecture des com ok")
                } else if (result.status && result.status !== 200) {
                    console.log("Lecture des com ko")
                }
            })
            .catch((error: any) => console.log('error', error));
        console.log(list)
    }, [comments])
    return (
        <div className="App">
            {!connected && <Login setConnected={setConnected}/>}
            {!connected && <Form/>}
            {connected && <PostForm setComments={setComments}/>}

            <h1>Tout les commentaires</h1>
            {
                list.map((comment: CommentInterface) => {
                    return (
                        <div key={comment.id}>
                            <h2>{comment.title}</h2>
                            <p>Par: {comment.author_id}<br/>Le: {}</p>
                            <p>{comment.description}</p>
                        </div>)
                })
            }
            <div className={"container-t"}>
                <div className={"circle"}>
                    <h1 className={"text"} id={"welcome"}>bienvenue</h1>
                </div>
            </div>
        </div>)
}

