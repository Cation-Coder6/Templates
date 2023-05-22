import express from "express"

import { getUsersByEmail, createUser } from "../../models/users.ts"
import { random, authentication } from "../../helpers"

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, userName } = req.body;

        if (!email || !password || !userName) return res.status(400).json({ "message": "Required Data Missing" })

        const existingUser = await getUsersByEmail(email);

        if (existingUser) return res.status(400).json({ "message": "User with this email already exists." })

        const salt = random();
        const user = await createUser({
            email,
            userName,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.status(201).json({ "user": { "email": email, "userName": userName } })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ "error": error });
    }
}