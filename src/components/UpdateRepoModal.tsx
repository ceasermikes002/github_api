import React, { useState } from 'react';

interface UpdateRepoModalProps {
  repoName: unknown;
  onClose: () => void;
  onUpdate: () => void;
}

const UpdateRepoModal: React.FC<UpdateRepoModalProps> = ({ repoName, onClose, onUpdate }) => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.github.com/repos/Kingz-tech/${repoName}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name || repoName, // Use existing name if not updated
          description,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update repository');
      }
      await onUpdate(); // Refresh the repo list
      onClose();
    } catch (error) {
      console.error('Error updating repository:', error);
      alert('Failed to update repository');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Update Repository</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRepoModal;
