import React from "react";
import usePostPostFrom from "../Hook/usePostPostFrom";


export default function PostForm() {

    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault()
        const PostPost = usePostPostFrom({event:e})

        PostPost(e)
            .then((result: any) => {
                if (result.status === 200) {
                    console.log("ajout du poste  Ok")
                } else {
                    console.log("ajout KO Ko")
                }
            })
            .catch((error: any) => console.log('error', error));
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