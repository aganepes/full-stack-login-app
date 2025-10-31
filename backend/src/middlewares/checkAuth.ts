import { NextFunction, Request, Response } from "express";
import prisma  from '../utils/prisma';
import  jwt, { Jwt }  from 'jsonwebtoken';
import { User } from "@prisma/client";

interface CustomRequest extends Request {
    user?: User;
}

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET';

type payload ={
    id:number,
    email:string
}
// req Request & {user:User}
const checkAuth=async function(req:CustomRequest,res:Response,next:NextFunction){
    
   
    try {
        const accessToken = req.cookies?.accessToken;
        const payload = jwt.verify(accessToken, JWT_SECRET) as payload;

        // control id and email
        const {id,email} = payload;
        const user = await prisma.user.findUnique({where:{email}});
        if(!user || user?.id != id){
            return res.status(401).json({error:"Invalid token", success:false});
        }
        req.user = user;
    } catch (error) {
        try {
            // refresh token
            const refreshToken = req.cookies?.refreshToken;
            if (!refreshToken || typeof refreshToken !== 'string') {
                return res.status(401).json({ error: "No token provided", success:false});
            }

            const payload = jwt.verify(refreshToken, JWT_SECRET) as payload;
            // control id and email
            const {id,email} = payload;
            const user = await prisma.user.findUnique({where:{email}});
            if(!user || user?.id != id){
                return res.status(401).json({error:"Invalid token", success:false});
            }
            req.user = user;
        } catch (error) {
            console.log("Refresh token verification failed", error);
            return res.status(500).json({ error: "Invalid token", success:false});
        }
    }

    next();
}

export default checkAuth;