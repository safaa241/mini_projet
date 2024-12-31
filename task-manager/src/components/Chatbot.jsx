import React, { useState } from 'react';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Bonjour ! Comment puis-je vous aider aujourd’hui ?' },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setTimeout(() => {
      const botMessage = getBotResponse(input);
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 500);

    setInput('');
  };

  const getBotResponse = (message) => {
    // Simulez une réponse plus intelligente
    const responses = {
      bonjour: 'Bonjour ! 😊 Comment puis-je vous aider ?',
      tâche: 'Vous pouvez gérer vos tâches dans le tableau de bord.',
      merci: 'Avec plaisir ! 😊',
      aide: 'Je suis là pour répondre à vos questions ou vous guider.',
    };

    const lowerMessage = message.toLowerCase();
    const responseText =
      Object.keys(responses).find((key) => lowerMessage.includes(key)) ||
      "Je ne suis pas sûr de comprendre, mais je suis là pour aider !";
    return { sender: 'bot', text: responses[responseText] || responseText };
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 p-6 relative">
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Chatbot</h2>
        <div className="h-64 overflow-y-auto border p-4 rounded-lg bg-gray-100">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white text-right'
                  : 'bg-gray-200 text-left'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez une question..."
            className="flex-grow border p-2 rounded-l-lg"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
