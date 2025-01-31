// routes/userRoutes.js
const express = require('express');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);
router.post('/create', createUser);
router.put('/update', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;
