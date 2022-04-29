import axios from 'axios';

export const apiBaseUrl = 'https://api.boardgameatlas.com/api/';
export const clientId = process.env.REACT_APP_BGATLAS_API_CLIENT_ID;

export const bgSearch = async (name) => {
  const searchUrl = `${apiBaseUrl}/search?client_id=${clientId}&name=${name}`;
  const response = await axios.get(searchUrl);
  return response.data.games;
}