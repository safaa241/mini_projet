import axios from 'axios';  

const API_URL = 'http://localhost:5000/api'; // Remplacez par l'URL de votre backend si nécessaire  

// Fonction pour enregistrer un utilisateur  
export const registerUser = async (userData) => {  
  try {  
      const response = await axios.post(`${API_URL}/users/register`, userData);  
      return { success: true, data: response.data }; // Renvoie les données de l'utilisateur enregistré  
  } catch (error) {  
      console.error('Erreur lors de l\'inscription de l\'utilisateur:', error);  
      return { success: false, error: error.response ? error.response.data : 'Erreur inconnue' }; // Gestion des erreurs  
  }  
};  

// Fonction pour connecter un utilisateur  
export const loginUser = async (userData) => {  
  try {  
    const response = await axios.post(`${API_URL}/users/login`, userData);  
    return { success: true, data: response.data }; // Renvoie le token  
  } catch (error) {  
    console.error('Erreur lors de la connexion:', error);  
    return { success: false, error: error.response ? error.response.data : 'Erreur inconnue' };  
  }  
};  

// Fonction pour récupérer les tâches  
export const fetchTasks = async () => {  
  try {  
    const token = localStorage.getItem('token'); // Récupérer le token de connexion  
    const response = await axios.get(`${API_URL}/tasks`, {  
      headers: {  
        Authorization: `Bearer ${token}` // Ajouter le token dans l'en-tête  
      }  
    });  
    return { success: true, data: response.data }; // Renvoie la liste des tâches  
  } catch (error) {  
    console.error('Erreur lors de la récupération des tâches:', error);  
    return { success: false, error: error.response ? error.response.data : 'Erreur inconnue' };  
  }  
};  

// Fonction pour ajouter une tâche  
export const addTask = async (taskData) => {  
  try {  
    const token = localStorage.getItem('token');  
    const response = await axios.post(`${API_URL}/tasks`, taskData, {  
      headers: {  
        Authorization: `Bearer ${token}`  
      }  
    });  
    return { success: true, data: response.data }; // Renvoie la tâche ajoutée  
  } catch (error) {  
    console.error('Erreur lors de l\'ajout d\'une tâche:', error);  
    return { success: false, error: error.response ? error.response.data : 'Erreur inconnue' };  
  }  
};  

// Fonction pour mettre à jour une tâche  
export const updateTask = async (id, taskData) => {  
  try {  
    const token = localStorage.getItem('token');  
    const response = await axios.put(`${API_URL}/tasks/${id}`, taskData, {  
      headers: {  
        Authorization: `Bearer ${token}`  
      }  
    });  
    return { success: true, data: response.data }; // Renvoie la tâche mise à jour  
  } catch (error) {  
    console.error('Erreur lors de la mise à jour de la tâche:', error);  
    return { success: false, error: error.response ? error.response.data : 'Erreur inconnue' };  
  }  
};  

// Fonction pour supprimer une tâche  
export const deleteTask = async (id) => {  
  try {  
    const token = localStorage.getItem('token');  
    const response = await axios.delete(`${API_URL}/tasks/${id}`, {  
      headers: {  
        Authorization: `Bearer ${token}`  
      }  
    });  
    return { success: true, data: response.data }; // Renvoie une confirmation de suppression  
  } catch (error) {  
    console.error('Erreur lors de la suppression de la tâche:', error);  
    return { success: false, error: error.response ? error.response.data : 'Erreur inconnue' };  
  }  
};