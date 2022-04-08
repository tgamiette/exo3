import {useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.css"
import './App.css'
import Form from "./form";
import Login from "./Login";
import {UserInterface} from "./Interface/User";
import Post from "./Post";
import Cookies from 'universal-cookie';


function App() {
    const cookies = new Cookies();
    const [connected, setConnected] = useState(false)
    return (
        <div className="App">
            {!connected && <Login cookies={cookies} setConnected={setConnected}/>}
            {!connected && <Form/>}
            {connected && <Post cookies={cookies}/>}

        </div>
    )
}

export default App
