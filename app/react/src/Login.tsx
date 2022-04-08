import React, {Dispatch, useEffect, useState} from "react";
import {UserLoginInterface} from "./Interface/User";
import Cookies from 'universal-cookie';
import {useCookies} from "react-cookie";

export default function Login({cookies, setConnected}: { cookies: Cookies, setConnected: Dispatch<boolean> }) {
    // @ts-ignore
    const handleSubmit = (e) => {

        e.preventDefault()
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Access-Control-Request-Method", "POST");
        const raw = new URLSearchParams({'name': e.target.name.value, 'password': e.target.password.value});
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        fetch("http://localhost:1234/api/login/", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    console.log("connexion ok")
                    document.cookie = `jwt=${result.jwt}`
                    cookies.set('jwt', result.jwt)
                    setConnected(true)
                } else {
                    console.log("pas Good")
                }
            })
            .catch(error => console.log('error', error));
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
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Se connecter
                    </button>
                </div>
            </form>
        </div>
    )
}