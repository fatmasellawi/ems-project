import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Créer l'application Express
const app = express();
app.use(cors());
app.use(express.json());

// Charger les variables d'environnement
const PORT = process.env.PORT || 8000;

// Créer une connexion à la base de données MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connexion à la base de données MySQL
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à MySQL:", err.message);
    return;
  }
  console.log("Connecté à la base de données MySQL");
  
  // Lancer le serveur après une connexion réussie à la DB
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
});

// Route pour récupérer tous les utilisateurs (GET)
app.get('/', (req, res) => {
  const query = "SELECT * FROM users";  // Sélectionner tous les utilisateurs de la table `users`
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des utilisateurs:", err.message);
      return res.status(500).json({ success: false, message: "Erreur lors de la récupération des utilisateurs", error: err.message });
    }
    res.json({ success: true, data: results });  // Envoie les utilisateurs récupérés
  });
});

// Route pour créer un utilisateur (POST)
app.post("/create", (req, res) => {
  const { name, email, mobile } = req.body;

  // Validation basique
  if (!name || !email || !mobile) {
    return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires." });
  }

  const query = "INSERT INTO users (name, email, mobile) VALUES (?, ?, ?)";
  db.query(query, [name, email, mobile], (err, result) => {
    if (err) {
      console.error("Erreur lors de la création de l'utilisateur:", err.message);
      return res.status(500).json({ success: false, message: "Erreur lors de la création de l'utilisateur", error: err.message });
    }
    res.json({ success: true, message: "Utilisateur créé avec succès", data: { id: result.insertId, name, email, mobile } });
  });
});

// Route pour mettre à jour un utilisateur (PUT)
app.put("/update", (req, res) => {
  const { id, name, email, mobile } = req.body;

  if (!id || !name || !email || !mobile) {
    return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires." });
  }

  const query = "UPDATE users SET name = ?, email = ?, mobile = ? WHERE id = ?";
  db.query(query, [name, email, mobile, id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", err.message);
      return res.status(500).json({ success: false, message: "Erreur lors de la mise à jour de l'utilisateur", error: err.message });
    }
    res.json({ success: true, message: "Utilisateur mis à jour avec succès", data: { id, name, email, mobile } });
  });
});

// Route pour supprimer un utilisateur (DELETE)
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ success: false, message: "ID de l'utilisateur est requis." });
  }

  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de l'utilisateur:", err.message);
      return res.status(500).json({ success: false, message: "Erreur lors de la suppression de l'utilisateur", error: err.message });
    }
    res.json({ success: true, message: "Utilisateur supprimé avec succès", data: { id } });
  });
});
