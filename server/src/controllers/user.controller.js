import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken"
import responseHandler from "../handlers/response.handler.js";
import { check } from "express-validator";

const signup = async (req, res) => {
    try {
        const { username, password, displayname } = req.body
        if (checkUser) return responseHandler.badrequest(res, "username already used")

        const user = new userModel()
        const checkUser = await userModel.findOne({ username })
        user.displayName = displayname
        user.username = username
        user.setPassword(password)

        await user.save()

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        )

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
        })

    } catch {
        responseHandler.error(res)
    }
}

const signin = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await userModel.findOne({ username }).select("username password salt id displayName")
        if (!user) return responseHandler.badrequest(res, "User not exist")
        if (!use.validPassword(password)) return responseHandler.badrequest(res, "Wrong password")

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        )

        user.password = undefined
        user.salt = undefined

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
        })

    } catch (error) {
        responseHandler.error(error)
    }
}

const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body
        const user = await userModel.findById(req.user.id).select("password is salt")
        if (!user) return responseHandler.unauthorize(res)
        if (!user.validPassword(password)) return responseHandler.badrequest(res, "Wrong password")

        user.setPassword(newPassword)
        await user.save()
        responseHandler.ok(res)
    } catch (error) {
        responseHandler.error(error)
    }
}

const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)
        if (!user) return responseHandler.notfound(res)
        responseHandler.ok(res, user)
    } catch (error) {
        responseHandler.error(error)
    }
}

export default {
    signup, signin, getInfo, updatePassword
}