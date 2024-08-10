import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRepos } from '../../utils/githubApi';
import CreateRepoModal from '../components/CreateRepoModal';

const ReposList = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchRepos().then(data => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCreateRepo = () => {
    fetchRepos().then(data => {
      setRepos(data);
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading) return <p className="text-center text-lg text-white">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md relative">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">My GitHub Repositories</h1>
      <p className="mb-4 text-lg text-gray-600">
        Total Repositories: <span className="font-semibold text-gray-900">{repos.length}</span>
      </p>
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 bg-stone-500 text-white rounded-lg shadow hover:bg-black transition"
      >
        Create New Repository
      </button>
      <ul className="list-disc pl-5">
        {repos.map((repo) => (
          <li key={repo.id} className="mb-2">
            <Link to={`/repo/${repo.name}`} className="text-blue-500 hover:underline text-lg">
              {repo.name}
            </Link>
          </li>
        ))}
      </ul>
      {showModal && (
        <CreateRepoModal onClose={() => setShowModal(false)} onCreate={handleCreateRepo} />
      )}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default ReposList;
  