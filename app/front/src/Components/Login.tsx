import React, {Dispatch, useEffect, useState} from "react";
import {UserLoginInterface} from "../Interface/User";
import Cookies from 'universal-cookie';
import {useCookies} from "react-cookie";
import useGetLoginFrom from "../Hook/useGetLoginFrom";

export default function Login({setConnected}: { setConnected: Dispatch<boolean> }) {
    const cookies = new Cookies();
    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault()
        const myHeaders = new Headers();
        const getLogin = useGetLoginFrom({setConnected: setConnected, event: e})
        getLogin()
            .then((result: any) => {
                if (result.status === 200) {
                    console.log("connexion ok")
                    cookies.set('jwt', result.jwt)
                    setConnected(true)
                } else {
                    console.log("connexion Ko")
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
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Se connecter
                    </button>
                </div>
            </form>
        </div>
    )
}