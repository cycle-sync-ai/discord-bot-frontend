"use client";

import { addBot, CreateBot, listBots, removeBot } from "@/service/bot.service";
import { useEffect, useState } from "react";

interface Bot {
  id: number;
  userId: string;
  botName: string;
  botDescription: string;
  createdAt: string;
}

export default function Home() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBot, setNewBot] = useState<CreateBot>({
    userId: "",
    botName: "",
    botToken: "",
    botDescription: "",
  });
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    fetchBots();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your API call here to create the bot

    await handleAddBot(newBot);
    setIsModalOpen(false);
    await fetchBots(); // Refresh the list
  };

  const handleAddBot = async (data: CreateBot) => {
    await addBot(data); // Refresh the list
  };

  const fetchBots = async () => {
    try {
      const botsData = await listBots();
      setBots(botsData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveBot = async (id: number) => {
    // Add your API call here to delete the bot
    await removeBot(id);
    await fetchBots(); // Refresh the list
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Welcome to Bot Dashboard
      </h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add New Bot
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="absolute left-0 top-0 w-full h-full inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="bg-white p-6 rounded-lg w-full max-w-md z-10">
            <h2 className="text-2xl font-bold mb-4">Create New Bot</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="userId"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  User ID
                </label>
                <input
                  id="userId"
                  type="text"
                  value={newBot.userId}
                  onChange={(e) =>
                    setNewBot({ ...newBot, userId: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter user ID"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="botName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Bot Name
                </label>
                <input
                  id="botName"
                  type="text"
                  value={newBot.botName}
                  onChange={(e) =>
                    setNewBot({ ...newBot, botName: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="botToken"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Bot Token
                </label>
                <div className="relative">
                  <input
                    id="botToken"
                    type={showToken ? "text" : "password"}
                    value={newBot.botToken}
                    onChange={(e) =>
                      setNewBot({ ...newBot, botToken: e.target.value })
                    }
                    className="w-full p-2 border rounded-md pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  >
                    {showToken ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="botDescription"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="botDescription"
                  value={newBot.botDescription}
                  onChange={(e) =>
                    setNewBot({ ...newBot, botDescription: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Bot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bot Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bots.map((bot) => (
                  <tr
                    key={bot.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bot.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {bot.botName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {bot.botDescription}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-between">
                      {new Date(bot.createdAt.replace(" ", "T")).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                      <button
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                        onClick={() => handleRemoveBot(bot.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
