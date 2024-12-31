import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskDetails from './TaskDetails';
import Chatbot from './Chatbot';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Charger les tâches depuis le localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Sauvegarder les tâches dans le localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Charger l'état du mode sombre depuis le localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
  }, []);

  // Sauvegarder l'état du mode sombre dans le localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, { id: Date.now(), ...task }]);
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    if (selectedTask?.id === id) setSelectedTask(null);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setSelectedTask(null);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      } transition-colors duration-300`}
    >
      {/* Navigation */}
      <nav
        className={`${
          darkMode ? 'bg-gray-800' : 'bg-indigo-600'
        } fixed w-full top-0 shadow-lg z-50`}
      >
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold tracking-wide text-white">
            Tableau de Bord
          </h1>
          <div className="flex items-center space-x-4">
            {/* Bouton pour le mode sombre */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:shadow-lg transition"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-yellow-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2m4.2 2.2l1.4-1.4m3.4 5.2h-2m-2.2 4.2l1.4 1.4m-5.2 3.4v-2m-4.2-2.2l-1.4 1.4m-3.4-5.2h2m2.2-4.2L7.8 4.8M12 12a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0112.002 22c-5.385 0-9.75-4.365-9.75-9.75 0-4.247 2.636-7.868 6.314-9.207a0.75 0.75 0 01.95.716v1.526a7.227 7.227 0 00-4.29 6.716 7.253 7.253 0 007.25 7.25c3.97 0 7.252-3.284 7.252-7.253 0-.158-.012-.316-.035-.472a0.75 0.75 0 01.716-.95h1.523a0.75 0.75 0 01.715.95c-.14.7-.333 1.377-.566 2.027z"
                  />
                </svg>
              )}
            </button>
            {/* Bouton pour le chatbot */}
            <button
              onClick={() => setIsChatbotOpen(!isChatbotOpen)}
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 shadow-lg transition"
            >
              {isChatbotOpen ? 'Fermer Chatbot' : 'Ouvrir Chatbot'}
            </button>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="container mx-auto p-6 pt-24">
        {!selectedTask ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <TaskForm onAddTask={handleAddTask} />
              </div>
              <div className="mt-6">
                <TaskList
                  tasks={tasks}
                  onDeleteTask={handleDeleteTask}
                  onSelectTask={setSelectedTask}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <TaskDetails
              task={selectedTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onClose={() => setSelectedTask(null)}
            />
          </div>
        )}
      </div>

      {/* Chatbot */}
      {isChatbotOpen && (
        <div
          className={`fixed bottom-4 right-4 ${
            darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
          } rounded-lg shadow-xl p-6 w-80 transition`}
        >
          <Chatbot onClose={() => setIsChatbotOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
