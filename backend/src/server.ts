import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import platRouter from './router/plat.router'
import userRouter from './router/user.router'
import { dbConnect } from './configs/database.config';
dbConnect();


const app = express();
app.use(express.json());

// Configuration de CORS
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]  // Remplacez par le domaine approprié en production
}));

app.use("/api/plats", platRouter);
app.use("/api/users", userRouter);

// Démarrage du serveur
const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});
