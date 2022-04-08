import React, {useEffect, useState} from "react";
import {PostInterface} from "./Interface/Post";
import Cookies from 'universal-cookie';


export default function Post({cookies}: { cookies: Cookies }) {
    const [post, setPost] = useState<PostInterface>({description: "", title: ""})
    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault()
        setPost({title: e.target.title.value, description: e.target.description.value})

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Access-Control-Request-Method", "POST");
        myHeaders.append('Authorization', cookies.get('jwt'));
        const raw = new URLSearchParams({title: e.target.title.value, description: e.target.description.value});
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            mode: 'cors',
            credentials: 'include'
        };

        console.log(cookies.get('jwt'), raw, myHeaders, requestOptions)


        fetch(`http://localhost:1234/api/post/${cookies.get('jwt')}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.status === 200) {
                    console.log("ajout réussi")
                } else {
                    console.log("ajout du commentaire Ko")
                }
            })
            .catch(error => console.log('error', error));
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Titre</label>
                    <input type="text" className="form-control" name={"title"}
                           placeholder="Example input"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Description</label>
                    <textarea className="form-control" name={"description"}
                              placeholder="Another input"></textarea>
                </div>
                <div className="form-group">
                    <button className="form-control"
                            placeholder="Another input"> Ajouter
                    </button>
                </div>
            </form>
        </>
    )
}