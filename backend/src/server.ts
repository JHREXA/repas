import express from "express";
import cors from "cors";
import { sample_plat, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

// Configuration de CORS
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]  // Remplacez par le domaine approprié en production
}));

// Route pour récupérer tous les plats
app.get("/api/plats", (req, res) => {
    res.send(sample_plat);
});

// Route pour rechercher des plats par terme de recherche
app.get("/api/plats/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm.toLowerCase();
    const plats = sample_plat.filter(plat =>
        plat.name.toLowerCase().includes(searchTerm)
    );
    res.send(plats);
});

// Route pour récupérer les tags des plats
app.get("/api/plats/tags", (req, res) => {
    res.send(sample_tags);
});

// Route pour récupérer les plats par tag
app.get("/api/plats/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName.toLowerCase();
    const plats = sample_plat.filter(plat =>
        plat.tags && plat.tags.some((tag:any) => tag.toLowerCase() === tagName)
    );
    res.send(plats);
});

app.get("/api/plats/:platId", (req,res) => {
    const platId = req.params.platId;
    const plat = sample_plat.find(plat => plat.id === platId);
    res.send(plat); // Envía el objeto Plat directement
});

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
app.post("/api/users/login", (req, res) => {
    const { email, password } = req.body;
    const user = sample_users.find(u => u.email === email && u.password === password);

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
});

// Démarrage du serveur
const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});
