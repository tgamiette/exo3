import React, {useEffect, useState} from "react";
import {UserInterface} from "../Interface/User";
import usePostUserFrom from "../Hook/usePostUserFrom";
import useGetPostFrom from "../Hook/useGetPostFrom";


export default function Form() {
    const [user, setUser] = useState<UserInterface>({name: "", password: ""})
    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({password: e.target.password.value, name: e.target.name.value})
        console.log(user)
        const PostUser = usePostUserFrom(user)

        // @ts-ignore
        PostUser()
            .then((result: any) => {
                console.log(result)
                if (result.status === 200) {
                    console.log("good")
                } else {
                    console.log("pas Good")
                }
            })
            .catch((error: any) => console.log('error', error));
    }
    return (
        <div className="form-body">
            <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                    <input type="text" name="name"
                           className="form-control form-control-lg"/>
                    <label className="form-label" htmlFor="form3Example1cg">Your
                        Name</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="text" name="password"
                           className="form-control form-control-lg"/>
                    <label className="form-label" htmlFor="form3Example3cg">Your
                        password</label>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit"
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register
                    </button>
                </div>
            </form>
        </div>
    )
}