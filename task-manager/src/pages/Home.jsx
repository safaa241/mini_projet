import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Bienvenue dans le gestionnaire de tâches
      </h1>
      <p className="text-gray-600 mb-6">
        Connectez-vous ou créez un compte pour commencer.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
};

export default Home;
