import React, { useState } from 'react';

const TaskDetails = ({ task, onUpdateTask, onDeleteTask, onClose }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onUpdateTask(editedTask);
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Détails de la tâche</h2>
      <div className="mb-4">
        <label className="block font-bold mb-1">Titre</label>
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask({ ...editedTask, title: e.target.value })
          }
          className="w-full border border-gray-300 p-2 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Description</label>
        <textarea
          value={editedTask.description}
          onChange={(e) =>
            setEditedTask({ ...editedTask, description: e.target.value })
          }
          className="w-full border border-gray-300 p-2 rounded-lg"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Sauvegarder
        </button>
        <button
          onClick={() => onDeleteTask(task.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Supprimer
        </button>
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
