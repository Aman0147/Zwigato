import axios from "axios"
import React, { useContext, useState } from 'react'
import { assets } from "../../assets/assets"
import { StoreContext } from '../../Context/StoreContext'
import "./Login.css"
const Login = ({ setLogin }) => {
    const  {url,token,setToken} = useContext(StoreContext);

    const [currState, setCurrState] = useState("Sign Up")
    const[data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data=>({...data,[name]:value}));
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;

        if(currState === "Login"){
            newUrl += "/api/user/login";
        }

        else{
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setLogin(false)
        }

        else{
            alert(response.data.message);
        }
        
    }


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name="name" onChange={onChangeHandler} value={data.name} type="text" required placeholder='Your Name' />}
                    <input name="email"  onChange = {onChangeHandler} value = {data.email} type="email" required placeholder='Your Email' />
                    <input name="password"  onChange = {onChangeHandler} value = {data.password} type="password" required placeholder='Password' />
                </div>

                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use and privacy policy</p>
                </div>

                {currState === "Login" ? <p >Create a new account? <span className='click-here' onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                : <p >Already have an account? <span className='click-here' onClick={() => setCurrState("Login")}>Login here</span></p>}


            </form>
        </div>
    )
}

export default Login
