import {Request,Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma  from '../utils/prisma';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET';

export const register = async (req:Request,res:Response)=>{
    const {email,password,name} = req.body;

    if(!email || !password){
        return res.status(400).json({error:"Email and password are required.", success:false});
    }
    try{
        const existingUser = await prisma.user.findUnique({where:{email}});
        if(existingUser){
            return res.status(409).json({error:"This email address is already in use", success:false});
        }
        // create bcrypt for password.
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data:{
                email,
                password:hashedPassword,
                name,
            },
            select:{id:true,email:true,name:true},
        });
        // create access token
        const accessToken=jwt.sign({id:user.id,email:user.email},JWT_SECRET,{expiresIn:'15m'});
        res.cookie('accessToken',accessToken,{
            maxAge: 54000000, 
            httpOnly: true,
            sameSite:"lax",
            secure:process.env.NODE_ENV === 'production',
        });
        // create refresh token
        const refreshToken=jwt.sign({id:user.id,email:user.email},JWT_SECRET,{expiresIn:'7d'});
        res.cookie('refreshToken',refreshToken,{
            maxAge: 3628800000, 
            httpOnly: true,
            sameSite:"lax",
            secure:process.env.NODE_ENV === 'production',
        });

        res.status(201).json({message:"User registered successfully",user:{id:user.id,email:user.email,name:user.name}, success:true});

    }catch(error){
        console.error("Registration error:",error);
        res.status(500).json({error:"Error server.", success:false});
    }
}

export const login = async(req:Request,res:Response)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({error:"Email and password are required.", success:false});
    }

    try{
        const user = await prisma.user.findUnique({where:{email}});
        if(!user){
            return res.status(401).json({error:"Invalid email or password", success:false});
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({error:`Invalid  password of ${email}`, success:false});
        }

        // create access token
        const accessToken=jwt.sign({id:user.id,email:user.email},JWT_SECRET,{expiresIn:'15m'});
        res.cookie('accessToken',accessToken,{
            maxAge: 54000000, 
            httpOnly: true,
            sameSite:"lax",
            secure:process.env.NODE_ENV === 'production',
        });
        // create refresh token
        const refreshToken=jwt.sign({id:user.id,email:user.email},JWT_SECRET,{expiresIn:'7d'});
        res.cookie('refreshToken',refreshToken,{
            maxAge: 3628800000, 
            httpOnly: true,
            sameSite:"lax",
            secure:process.env.NODE_ENV === 'production',
        });
        
        res.json({
            message:"Login successful!",
            user:{id:user.id,email:user.email,name:user.name},
            success:true
        });
    }catch(error){
        console.log("Login error",error);
        res.status(500).json({error:"Server error.", success:false});
    }

}

export const refreshToken = async(req:Request,res:Response)=>{

    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken || typeof refreshToken !== 'string') {
        return res.status(401).json({ error: "No refresh token provided", success:false});
    }

    let payload: { id: number; email: string };
    try {
        payload = jwt.verify(refreshToken, JWT_SECRET) as { id: number; email: string };
    } catch (error) {
        console.log("Refresh token verification failed", error);
        return res.status(401).json({ error: "Invalid token", success:false });
    }

    const {id,email} = payload;

    const user = await prisma.user.findUnique({where:{email}});
    if(!user || user?.id != id){
        return res.status(401).json({error:"Invalid token", success:false});
    }

    try{
        // create access token
        const accessToken=jwt.sign({id:user.id,email:user.email},JWT_SECRET,{expiresIn:'15m'});
        res.cookie('accessToken',accessToken,{
            maxAge: 54000000, 
            httpOnly: true,
            sameSite:"lax",
            secure:process.env.NODE_ENV === 'production',
        });
        
        res.json({ message:"Refresh Token successful!",user:{id:user.id,email:user.email,name:user.name}, success:true});

    }catch(error){
        console.log("Access token error",error);
        res.status(500).json({error:"Server error.", success:false});
    }

}

export const logout = async(req:Request,res:Response)=>{

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.json({ message:"Clear token successful", success:true});

}

export const me = async(req: Request & { user?: User }, res: Response)=>{

    if(req?.user){
        const { password, ...userData } = req.user;
        try {
            const accessToken = req.cookies?.accessToken;
            jwt.verify(accessToken, JWT_SECRET);
        } catch (error) {
            // create access token
            const accessToken=jwt.sign({id:userData.id,email:userData.email},JWT_SECRET,{expiresIn:'15m'});
            res.cookie('accessToken',accessToken,{
                maxAge: 54000000, 
                httpOnly: true,
                sameSite:"lax",
                secure:process.env.NODE_ENV === 'production',
            });
        }
       
        return res.json({ message:"successful", user:userData, success:true});
    }
    
    return res.json({ error:"Not data", success:false});

}