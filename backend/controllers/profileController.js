import User from "../model/User.js"

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password")
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.json({
            user
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}