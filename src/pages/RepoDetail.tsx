import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRepo, deleteRepo, fetchRepoLanguages } from '../../utils/githubApi';
import ConfirmationModal from '../components/ConfirmationModal';

const RepoDetail = () => {
  const { repoName } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [repo, setRepo] = useState<any>(null);
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (repoName) {
      const fetchData = async () => {
        try {
          console.log(`Fetching details for repo: ${repoName}`);
          const repoData = await fetchRepo(repoName);
          console.log('Repository data:', repoData);

          const languagesData = await fetchRepoLanguages(repoName);
          console.log('Languages data:', languagesData);

          setRepo(repoData);
          setLanguages(languagesData);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching repository details:', err);
          setError('Failed to fetch repository details');
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setError('Repository name is missing');
      setLoading(false);
    }
  }, [repoName]);

  const handleDelete = async () => {
    if (repoName) {
      try {
        await deleteRepo(repoName);
        window.location.href = '/'; // Redirect to homepage after deletion
      } catch (err) {
        console.error('Error deleting repository:', err);
        setError('Failed to delete repository');
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) return <p className="text-center text-lg text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      {repo ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{repo.name}</h1>
          <p className="mb-4 text-gray-700">{repo.description || 'No description available'}</p>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Languages Used:</h2>
            <ul className="list-disc pl-5 text-gray-600">
              {Object.entries(languages).map(([language, bytes]) => (
                <li key={language} className="mb-1">
                  <strong>{language}:</strong> {bytes} bytes
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={openModal}
            className="w-full p-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
           🗑️ Delete Repository
          </button>
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handleDelete}
          />
        </>
      ) : (
        <p className="text-center text-gray-700">Repository not found</p>
      )}
    </div>
  );
};

export default RepoDetail;
