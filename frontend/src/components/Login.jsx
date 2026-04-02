import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from "./api.jsx"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [eyeOpen, setEyeOpen] = useState(false)

    const navigate = useNavigate()

    const handlePwdEye = () => {
        setEyeOpen(!eyeOpen)
    }

    const handleForm = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post("/user/login", {
                username,
                password
            })
            alert("Login Successfull!")
            localStorage.setItem("token", res.data.token);
            navigate("/note");
        } catch (error) {
            alert("Invalid Credentials.")
        }
    }
    return (
        <div className="login-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 loginImage">
                        <img
                            src="https://demos.themeselection.com/sneat-mui-nextjs-admin-template/demo-1/images/illustrations/characters-with-objects/7.png"
                            alt="Login"
                        />
                    </div>

                    <div className="col-md-4 data-container">
                        <h2>Welcome to Notes App </h2>
                        <h4>Please sign-in to your account</h4>

                        <form method='post' onSubmit={handleForm}>

                            <div className="input-box">
                                <label>Username</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="xpiidy" />
                            </div>

                            <div className="input-box password-input">
                                <label>Password</label>
                                <input type={`${!eyeOpen ? "password" : "text"}`} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="......." />
                                <i onClick={handlePwdEye} className={`fa-solid ${!eyeOpen ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </div>

                            <div className="input-box checkbox">
                                <input type="checkbox" defaultChecked />
                                <label>Remember me</label>
                            </div>

                            <button type="submit">Login</button>
                        </form>
                        <h4 className='user-link'>Don't have an account ?  <Link to="/signup">Signup here</Link></h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
