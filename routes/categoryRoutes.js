import express from 'express';
import * as categoryController from '../controllers/categoryController';

const router = express.Router();

// Route pour créer une catégorie
router.post('/create', categoryController.createCategory);

// Route pour récupérer toutes les catégories
router.get('/', categoryController.getCategories);

// Route pour récupérer une catégorie par ID
router.get('/:id', categoryController.getCategoryById);

// Route pour mettre à jour une catégorie par ID
router.put('/update/:id', categoryController.updateCategory);

// Route pour supprimer une catégorie par ID
router.delete('/delete/:id', categoryController.deleteCategory);

export default router;
