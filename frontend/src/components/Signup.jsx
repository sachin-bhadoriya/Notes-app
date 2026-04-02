import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from './api'


const Signup = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await API.post("/user/signup", {
        email,
        username,
        password
      })

      alert("Signup Successful!")

      navigate("/")
    } catch (error) {
      console.log("Something went wrong.")
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

            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="abc@gmail.com" />
              </div>

              <div className="input-box">
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="xpiidy" />
              </div>

              <div className="input-box">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="........" />
              </div>

              <button type="submit">Login</button>
            </form>
            <h4 className='user-link'>Don't have an account ?  <Link to="/">Login here</Link></h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
