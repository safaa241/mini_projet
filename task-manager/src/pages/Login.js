import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Vérifie si les informations d'identification sont correctes
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setMessage("Connexion réussie !");
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } else {
      setMessage("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Connexion</h1>
        {message && (
          <p className={`mb-4 text-center text-sm p-2 rounded ${
            message.includes("incorrect") ? "text-red-700 bg-red-100" : "text-green-700 bg-green-100"
          }`}>
            {message}
          </p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
