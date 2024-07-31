import { Router } from "express";
import { sample_users } from "../data";
import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model";
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
            res.status(400).send("L'utilisateur ou le mot de passe est invalide");
        }
    }
));
export default router;