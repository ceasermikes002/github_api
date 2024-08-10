import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

export const fetchRepos = async (page: number = 1, perPage: number = 2) => {
  const response = await api.get(`/user/repos`, {
    params: {
      page,
      per_page: perPage,
    },
  });
  return response.data;
};

export const fetchRepo = async (repoName: string) => {
  const response = await api.get(`/repos/${import.meta.env.VITE_GITHUB_USERNAME}/${repoName}`);
  return response.data;
};

// Function to fetch repository languages
export const fetchRepoLanguages = async (repoName: string) => {
  const response = await api.get(`/repos/${import.meta.env.VITE_GITHUB_USERNAME}/${repoName}/languages`);
  return response.data;
};


export const createRepo = async (repoName: string) => {
  const response = await api.post('/user/repos', { name: repoName });
  return response.data;
};

export const deleteRepo = async (repoName: string) => {
  await api.delete(`/repos/${import.meta.env.VITE_GITHUB_USERNAME}/${repoName}`);
};
