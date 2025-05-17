import { Request, Response } from "express"

export const homePage = (req:Request ,res:Response) => {
    res.sendFile("index.html")
}