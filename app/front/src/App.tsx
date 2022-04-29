import {SetStateAction, useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.css"
import {CommentInterface} from "./Interface/Comment";
import Cookies from "universal-cookie";
import {LocalUserInterface} from "./Interface/LocalUserInterface";
import {BlogInterface, LoginResponseInterface} from "./Interface/ResponseInterfaces";
import HideIfLogged from "./Components/HideIfLogged";
import HideIfNotLogged from "./Components/HideIfNotLogged";
import BlogList from "./Components/BlogList";
import LoginForm from "./Components/LoginForm";
import BlogForm from "./Components/BlogForm";
import useLogin from "./Hook/useLogin";
import useRegister from "./Hook/useRegister";
import useGetBlogList from "./Hook/useGetBlogList";

import jose from "jose";

export default function App() {
    const [loggedUser, setLoggedUser] = useState<LoginResponseInterface>({
        status: 'error',
        token: "",
        username: ""
    })
    const cookies = new Cookies();
    const [localUser, setLocalUser] = useState<LocalUserInterface>({password: "", username: ""})
    const [blogList, setBlogList] = useState<BlogInterface[]>([])
    const [needsLogin, setNeedsLogin] = useState<boolean>(true)
    const [needsUpdate, setNeedsUpdate] = useState<boolean>(false)
    const [connected, setConnected] = useState<boolean>(false)
    const [list, setList] = useState([])
    const login = useLogin();
    const register = useRegister();
    const getBlogList = useGetBlogList();
    useEffect(() => {
        if (cookies.get('token') && cookies.get('hetic_username')) {
            console.log('cookies exist !', loggedUser)
            setLoggedUser(prev => ({
                ...prev,
                username: cookies.get('hetic_username'),
                token: cookies.get('token')
            }))
        }
    }, [])


    useEffect(() => {
        if (needsLogin && localUser.username !== '') {
            console.log('login ?')
            login(localUser.username, localUser.password)
                .then((isLogged: boolean) => {
                    if (isLogged) {
                        console.log('tu es co')
                        setLoggedUser({
                            message: "none",
                            status: 'success',
                            username: 'toto',
                            token: cookies.get('token')
                        })
                    }
                })
        } else if (!needsLogin && localUser.username !== '') {
            console.log('register ?', localUser.username)
            register(localUser.username, localUser.password)
                .then((isRegister) => {
                    if (isRegister) {
                        // setLoggedUser(data)
                    }
                })
        }
    }, [localUser])


    // Axios


    useEffect(() => {
        getBlogList()
            .then((data: SetStateAction<BlogInterface[]>) => {
                setBlogList(data)
                setNeedsUpdate(false)
            })
    }, [needsUpdate])

    // useEffect(() => {
    //     const GetPost = useGetPostFrom()
    //     GetPost()
    //         .then((result: any) => {
    //             console.log(result, new Cookies().get('jwt'))
    //             if (result.status == 200) {
    //                 setList(result.value)
    //                 console.log("Lecture des com ok")
    //             } else if (result.status && result.status !== 200) {
    //                 console.log("Lecture des com ko")
    //             }
    //         })
    //         .catch((error: any) => console.log('error', error));
    //     // console.log(list)
    // }, [comments])
    //

    const handleDisconnect = () => {
        setLoggedUser({
            status: 'error',
            token: "",
            username: ""
        });

        // eraseCookie();
    }
    return (
        <div className='container mt-5'>
            <HideIfLogged loggedUser={loggedUser}>
                <LoginForm setLocalUser={setLocalUser} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin}/>
            </HideIfLogged>

            <HideIfNotLogged loggedUser={loggedUser}>
                <button className='btn btn-danger d-block mx-auto mb-3' onClick={handleDisconnect}>Disconnect</button>
                <BlogForm loggedUser={loggedUser} setNeedsUpdate={setNeedsUpdate}/>
            </HideIfNotLogged>

            <BlogList blogList={blogList}/>
        </div>
    )

}

