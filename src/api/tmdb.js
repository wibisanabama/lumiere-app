import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export const getTrending = async (mediaType = 'all', timeWindow = 'day') => {
  const response = await tmdbApi.get(`/trending/${mediaType}/${timeWindow}`);
  return response.data;
};

export const searchMedia = async (query) => {
  const response = await tmdbApi.get('/search/multi', {
    params: { query },
  });
  return response.data;
};

export const getDetails = async (mediaType, id) => {
  const response = await tmdbApi.get(`/${mediaType}/${id}`);
  return response.data;
};

export default tmdbApi;
