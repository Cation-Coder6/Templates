import express from "express"

import { register } from "../controllers/authentication/register.ts"
import { login } from "../controllers/authentication/login.ts"

export default (router: express.Router) => {
    router.post("/auth/register", register)
    router.post("/auth/login", login)

}