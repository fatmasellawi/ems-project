import express from 'express';
import ProductModel from '../models/ProductModel'; // Assurez-vous que le chemin est correct

const router = express.Router();

// Route pour récupérer tous les produits (GET)
router.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find(); // Récupère tous les produits depuis MongoDB
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des produits', error });
  }
});

// Route pour récupérer un produit par son ID (GET)
router.get('/products/:id', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id); // Récupère un produit par son ID
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération du produit', error });
  }
});

// Route pour créer un produit (POST)
router.post('/products', async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body); // Crée un produit avec les données envoyées
    await newProduct.save(); // Sauvegarde le produit dans la base de données
    res.json({ success: true, message: 'Produit créé avec succès', data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la création du produit', error });
  }
});

// Route pour mettre à jour un produit (PUT)
router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Met à jour le produit avec l'ID fourni
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    }
    res.json({ success: true, message: 'Produit mis à jour avec succès', data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du produit', error });
  }
});

// Route pour supprimer un produit (DELETE)
router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id); // Supprime le produit avec l'ID donné
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    }
    res.json({ success: true, message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression du produit', error });
  }
});

export default router;
