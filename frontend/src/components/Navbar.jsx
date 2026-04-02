import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from "./api"

const Navbar = () => {
    const [isNavShow, setIsNavShow] = useState(false)
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    function toggleNav(){
        setIsNavShow(!isNavShow)
    }
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    const getProfile = async () => {
        const res = await API.get("/profile")
        setUser(res.data)
    }


    useEffect(() => {
        getProfile()
    }, [])

  return (
    <div className='nav-container'>
        <div className="nav-home">
            Home
        </div>
        <div className="profile" onClick={toggleNav}>
            <ul className={!isNavShow ? "hide-profile" : ""}>
                <li>Name: {user?.user?.name}</li>
                <li>Username: {user?.user?.username}</li>
                <li>Email:{user?.user?.email}</li>
                <li>Contact: 987456321</li>
                <li onClick={handleLogout}>Logout</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar