import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv()

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({
            message: "Token not found"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded.id
        next()
    } catch (error) {
        res.status(401).json({
            message: "Invalid Token"
        })
    }
}

export default authMiddleware