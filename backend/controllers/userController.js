import { configDotenv } from "dotenv"
import User from "../model/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

configDotenv()

export const signup = async (req, res) => {
    const { name, username, email, password } = req.body

    console.log(req.body);
    

    if(!username) {
        return res.status(401).json({
            message: "All fields are required."
        })
    }
    
    
    const userExist = await User.findOne({email, username})
    
    if (userExist) {
       return res.status(400).json({ message: "User already Exist." })
    }
    
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({ name, username, email, password: hashedPassword })        
        
        res.status(201).json({ message: "Signup Successfully!", user })
        
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }

}

export const login = async (req, res) => {
    const { username, password } = req.body

    const userExist = await User.findOne({ username })
    if (!userExist) {
       return res.json({ message: "Invalid Credential" }).status(400)
    }

    const isMatch = await bcrypt.compare(password, userExist.password)
    if (!isMatch) {
      return  res.status(400).json({ message: "Invalid Credentials" })
    }

    const token = jwt.sign(
        {
            id: userExist._id
        },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
    );

    res.status(201).json({ message: "Login Successfully!", token })
}