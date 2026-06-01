const fallbackUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://agilemood-backend-production.up.railway.app'
    : 'http://localhost:8000';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || fallbackUrl;

export const API_ROUTES = {
  teams: `${API_BASE_URL}/teams/`,
  users: `${API_BASE_URL}/users/`,
  emotions: `${API_BASE_URL}/emotions/`,
  emotion: `${API_BASE_URL}/emotion/`,
  emotionRecords: `${API_BASE_URL}/emotion_record/`,
} as const;

export const INTEGRATION_ROUTES = {
  teamsConnect: (teamId: number) => `${API_BASE_URL}/teams/${teamId}/teams-connect`,
  slackToken: (teamId: number) => `${API_BASE_URL}/teams/${teamId}/slack-bot-token`,
  trelloConnect: (teamId: number) => `${API_BASE_URL}/integrations/trello/connect?team_id=${teamId}`,
  plannerSubscribe: (teamId: number) => `${API_BASE_URL}/integrations/planner/subscribe?team_id=${teamId}`,
};
