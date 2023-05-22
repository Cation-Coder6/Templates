import express from "express";
import { getUsersByEmail } from "../../models/users";
import { authentication, random } from "../../helpers";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ "message": "Missing parameters in request." })

        const user = await getUsersByEmail(email).select("+authentication.salt +authentication.password");
        if (!user) return res.status(404).json({ "message": "User with given email does not exist." })

        const expectedHash = authentication(user.authentication.salt, password)
        if (user.authentication.password !== expectedHash) return res.status(403).json({ "message": "User password Incorrect" })

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie("auth-cookie", user.authentication.sessionToken, { domain: "localhost", path: "/" });

        return res.status(200).json(user).end();

    } catch (error) {
        return res.status(400).json({ "error message": error })
    }
}