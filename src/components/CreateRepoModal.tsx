import React, { useState } from 'react';
import { createRepo } from '../../utils/githubApi';

interface Props {
  onClose: () => void;
  onCreate: () => void;
}

const CreateRepoModal: React.FC<Props> = ({ onClose, onCreate }) => {
  const [repoName, setRepoName] = useState('');

  const handleSubmit = async () => {
    await createRepo(repoName);
    onCreate();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg font-bold mb-4">Create New Repository</h2>
        <input
          type="text"
          required  
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          placeholder="Repository Name"
          className="border p-2 mb-4 w-full"
        />
        <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white mr-2">
          Create
        </button>
        <button onClick={onClose} className="p-2 bg-gray-500 text-white">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateRepoModal;
