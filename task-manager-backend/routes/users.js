const express = require('express');  
const router = express.Router();  
const User = require('../models/User');  
const bcrypt = require('bcryptjs');  

// Route pour inscrire un utilisateur  
router.post('/register', async (req, res) => {  
    const { name, email, password } = req.body;  

    // Validate the request body  
    if (!name || !email || !password) {  
        return res.status(400).json({ error: 'All fields are required' });  
    }  

    try {  
        // Check if user already exists  
        const existingUser = await User.findOne({ email });  
        if (existingUser) {  
            return res.status(400).json({ error: 'User already exists' });  
        }  
        
        // Create a new user  
        const newUser = new User({  
            name,  
            email,  
            password  // Password will be hashed in the pre-save hook  
        });  

        // Save the user  
        await newUser.save();  

        // Respond with user information  
        res.status(201).json({ id: newUser._id, name: newUser.name, email: newUser.email });  
    } catch (error) {  
        console.error('Registration error:', error);  
        res.status(500).json({ error: 'Registration failed' });  
    }  
}); 
router.post('/login', async (req, res) => {  
    const { email, password } = req.body;  

    // Validate the request body  
    if (!email || !password) {  
        return res.status(400).json({ error: 'Email and password are required' });  
    }  

    try {  
        // Find user by email  
        const user = await User.findOne({ email });  
        if (!user) {  
            return res.status(401).json({ error: 'User not found' });  
        }  

        // Compare the entered password with the hashed password  
        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) {  
            return res.status(401).json({ error: 'Incorrect password' });  
        }  

        // If login successful  
        res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });  
    } catch (error) {  
        console.error('Login error:', error);  
        res.status(500).json({ error: 'Login failed' });  
    }  
}); 

// Route pour récupérer tous les utilisateurs  
router.get('/', async (req, res) => {  
    try {  
        const users = await User.find();  
        res.json(users);  
    } catch (error) {  
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });  
    }  
});  

module.exports = router;