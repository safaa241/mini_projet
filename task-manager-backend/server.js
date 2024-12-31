const express = require('express');  
const mongoose = require('mongoose');  
const dotenv = require('dotenv');  
const cors = require('cors');  
const userRoutes = require('./routes/users'); // Ensure this path is correct  
const taskRoutes = require('./routes/tasks');  

// Load environment variables  
dotenv.config();  
const app = express();  

app.use(cors());  
app.use(express.json());  

mongoose.connect('mongodb://localhost:27017/task-manager')  
  .then(() => console.log('MongoDB connected'))  
  .catch((err) => console.log(err));  

// Set up routes  
app.use('/users', userRoutes); // This should lead to routes defined in 'users.js'  
app.use('/tasks', taskRoutes);  

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {  
    console.log(`Server running on port ${PORT}`);  
});