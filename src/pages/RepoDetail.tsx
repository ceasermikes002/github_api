import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRepo, deleteRepo, fetchRepoLanguages } from '../../utils/githubApi';
import UpdateRepoModal from '../components/UpdateRepoModal';

const RepoDetail = () => {
  const { repoName } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [repo, setRepo] = useState<any>(null);
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    if (repoName) {
      const fetchData = async () => {
        try {
          const repoData = await fetchRepo(repoName);
          const languagesData = await fetchRepoLanguages(repoName);
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

  const handleUpdate = async () => {
    if (repoName) {
      try {
        const updatedRepo = await fetchRepo(repoName); // Fetch updated repo data
        setRepo(updatedRepo);
      } catch (err) {
        console.error('Error updating repository:', err);
        setError('Failed to update repository');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {repo ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{repo.name}</h1>
          <p className="mb-2">{repo.description || 'No description available'}</p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Languages Used:</h2>
            <ul>
              {Object.entries(languages).map(([language, bytes]) => (
                <li key={language}>
                  <strong>{language}:</strong> {bytes} bytes
                </li>
              ))}
            </ul>
          </div>
          <button onClick={() => setShowUpdateModal(true)} className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg mr-5">
            Update Repository
          </button>
          <button onClick={handleDelete} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
            Delete Repository
          </button>
          {showUpdateModal && (
            <UpdateRepoModal repoName={repoName} onClose={() => setShowUpdateModal(false)} onUpdate={handleUpdate} />
          )}
        </>
      ) : (
        <p>Repository not found</p>
      )}
    </div>
  );
};

export default RepoDetail;
