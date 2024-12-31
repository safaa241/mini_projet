import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && date) {
      onAddTask({ title, description, date });
      setTitle('');
      setDescription('');
      setDate('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-4"
    >
      <h2 className="text-xl font-bold mb-2 dark:text-gray-100">Ajouter une Tâche</h2>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-100"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-100"
      ></textarea>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-100"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Ajouter
      </button>
    </form>
  );
};

export default TaskForm;
