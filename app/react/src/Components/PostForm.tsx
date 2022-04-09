import React, {Dispatch} from "react";
import usePostPostFrom from "../Hook/usePostPostFrom";
import {CommentInterface} from "../Interface/Comment";


export default function PostForm({setComments}: { setComments: Dispatch<CommentInterface> }) {

    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault()
        const PostPost = usePostPostFrom({event: e})
        setComments({description: e.target.description.value, title: e.target.title.value})

        PostPost(e)
            .then((result: any) => {
                if (result.status === 200) {
                    console.log("ajout du poste  Ok")
                } else {
                    console.log("ajout KO Ko")
                }
            })
            .catch((error: any) => console.log('error', error));
        e.target.description.value =''
        e.target.title.value =''
    }
    return (
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
    )
}