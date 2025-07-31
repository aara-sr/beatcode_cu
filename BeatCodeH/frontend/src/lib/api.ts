import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
});

// Attach token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// --- Auth ---
export const register = (data: { username: string; email: string; password: string }) =>
  api.post('/api/register', data);

export const login = (data: { email: string; password: string }) =>
  api.post('/api/login', data);

export const getProfile = () => api.get('/api/profile');
export const getUserMatches = () => api.get('/api/matches');

// --- Matchmaking ---
export const joinMatchmaking = () => api.post('/api/matches/matchmaking/join');
export const leaveMatchmaking = () => api.post('/api/matches/matchmaking/leave');
export const startMatch = () => api.get('/api/matches/matchmaking/start');

// --- Match ---
export const getMatch = (matchId: string) => api.get(`/api/matches/${matchId}`);
export const updateMatchTime = (matchId: string, remaining_time: number) =>
  api.post(`/api/matches/${matchId}/update-time`, { match_id: matchId, remaining_time });
export const submitSolution = (data: { match_id: string; code: string; language: string }) =>
  api.post('/api/matches/submit', data);
export const submitMatchResult = (matchId: string) =>
  api.post(`/api/matches/result/${matchId}`);
export const getLeaderboard = () => api.get('/api/matches/leaderboard');

// --- Problems ---
export const getRandomProblem = () => api.get('/api/problems/random');
export const getProblem = (problemId: number) => api.get(`/api/problems/${problemId}`);

// --- AI Review ---
export const createAIReview = (data: { code: string; language: string }) =>
  api.post('/api/ai-review/', data);
export const getAIReview = (matchId: string) => api.get(`/api/ai-review/${matchId}`);

export default api; 