import React from 'react';

const TaskList = ({ tasks, onDeleteTask, onSelectTask }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Liste des Tâches</h2>
      {tasks.length === 0 ? (
        <p>Aucune tâche ajoutée.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-2 border-b flex justify-between items-center"
            >
              <span>{task.title}</span>
              <div>
                <button
                  onClick={() => onSelectTask(task)}
                  className="bg-green-500 text-white px-2 py-1 rounded-lg mr-2"
                >
                  Détails
                </button>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
