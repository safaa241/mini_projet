const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Assurez-vous que le chemin est correct

// Route pour ajouter une tâche
router.post('/', async (req, res) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;

        // Création d'une nouvelle tâche avec les données reçues
        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
            status,
        });

        // Sauvegarde de la tâche dans la base de données
        await newTask.save();

        // Réponse avec succès
        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error adding task' });
    }
});

module.exports = router;
