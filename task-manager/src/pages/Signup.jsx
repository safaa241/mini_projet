import React, { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Vérifie si l'email est déjà utilisé
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      setMessage("Cet email est déjà utilisé.");
      return;
    }

    // Ajoute un nouvel utilisateur
    const newUser = { email, password };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    setMessage("Compte créé avec succès. Vous pouvez maintenant vous connecter.");
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Créer un compte</h1>
        {message && (
          <p className="mb-4 text-center text-sm text-gray-700 bg-green-100 p-2 rounded">
            {message}
          </p>
        )}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-300"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
