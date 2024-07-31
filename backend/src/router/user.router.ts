import { Router } from "express";
import { sample_users } from "../data";
import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs';

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
         const usersCount = await UserModel.countDocuments();
         if(usersCount > 0){
             res.send("Seed is already done");
             return;
         }
         await UserModel.create(sample_users);
         res.send("Seed is already done"); 
     }
 ));

// Definición de la función generateTokenResponse
const generateTokenResponse = (user: any) => {
    try {
        const token = jwt.sign(
            { email: user.email, isAdmin: user.isAdmin },
            "MaCleSecrete",
            { expiresIn: "30d" }
        );
        user.token = token;
        return user;
    } catch (error) {
        console.error("Error generating token:", error);
        return null; // o lanzar un error si prefieres
    }
};

// Endpoint de login
router.post("/login", asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({email, password})
    
        if (user) {
            const userWithToken = generateTokenResponse(user);
            if (userWithToken) {
                res.send(userWithToken);
            } else {
                res.status(500).send("Internal server error");
            }
        } else {
            res.status(HTTP_BAD_REQUEST).send("L'utilisateur ou le mot de passe est invalide");
        }
    }
));

router.post("/register", asyncHandler(
    async (req,res) => {
        const {name, email, password, address} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(HTTP_BAD_REQUEST)
            .send("L'utilisateur existe déjà. S'il vous plaît, login.");
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id:'',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        };

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
))

export default router;