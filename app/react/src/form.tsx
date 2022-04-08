import React, {useEffect, useState} from "react";
import {UserInterface} from "./Interface/User";


export default function Form() {
    const [user, setUser] = useState<UserInterface>({lastname: "", name: "", password:""})

    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({password: e.target.password.value, name: e.target.name.value})
    }

    useEffect(() => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Access-Control-Request-Method", "POST");
            const raw = new URLSearchParams({'name': user.name, 'password': user.password});
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };
            // @ts-ignore
            fetch("http://localhost:1234/api/user/", requestOptions)
                .then(response => response.text())
                .then(result => {
                    if (result.status === 200) {
                        console.log("good")
                    } else {
                        console.log("pas Good")
                    }
                })
                .catch(error => console.log('error', error));
        }
        , [user])

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