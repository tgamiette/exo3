import React, {useEffect, useState} from "react";
import {UserInterface} from "./Interface/User";


export default function Form({setUser, user}: { setUser: React.Dispatch<UserInterface>, user: UserInterface }) {
    const [newUser, setNewUser] = useState<UserInterface>({lastname: "", name: ""})

    const handleSubmit = (e: { preventDefault: () => void; target: { lastname: { value: any; }; name: { value: any; }; }; }) => {
        e.preventDefault()
        setUser({lastname: e.target.lastname.value, name: e.target.name.value})
    }

    // @ts-ignore
    const handleChange = (e) => {
        //     console.log(e.target.id,e.target.value)
        //     setNewUser(prevState => {{
        //          prevState[e.target.id] : e.target.value}})
    }

    return (
        <form onSubmit={handleSubmit}>
            <div onChange={handleChange} className="form-outline mb-4">
                <input type="text" name="name"
                       className="form-control form-control-lg"/>
                <label className="form-label" htmlFor="form3Example1cg">Your
                    Name</label>
            </div>

            <div className="form-outline mb-4">
                <input onChange={handleChange} type="text" name="lastname"
                       className="form-control form-control-lg"/>
                <label className="form-label" htmlFor="form3Example3cg">Your
                    lastname</label>
            </div>

            <div className="d-flex justify-content-center">
                <button type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register
                </button>
            </div>
        </form>
    )
}