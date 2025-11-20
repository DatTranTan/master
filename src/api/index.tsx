import axiosClient from "../configs/axios";

import {
  RegisterType,
  StartTestRequest,
  StartTestResponse,
  NextItemRequest,
  NextItemResponse,
  StopTestResponse,
  TestDetailResponse,
  TestSessionListItem,
} from "../types";

const register = async (data: RegisterType) => {
  const url = `/auth/register`;
  const result = await axiosClient.post(url, { ...data });
  return result;
};

const login = async (data: RegisterType) => {
  const url = `/auth/login`;
  const result = await axiosClient.post(url, { ...data });
  return result;
};
// 1) Start a new adaptive test session
export const startTest = async (
  subject: string
): Promise<StartTestResponse> => {
  const url = `/tests/start`;
  const body: StartTestRequest = { subject };
  const result = await axiosClient.post(url, body);
  return result;
};

// 2) Get next adaptive item
export const getNextItem = async (
  sessionId: number,
  response: 0 | 1 | null = null
): Promise<NextItemResponse> => {
  const url = `/tests/${sessionId}/next`;
  const payload: NextItemRequest = { response };
  const result = await axiosClient.post(url, payload);
  return result;
};

// 3) Stop test session
export const stopTest = async (
  sessionId: number
): Promise<StopTestResponse> => {
  const url = `/tests/${sessionId}/stop`;
  const result = await axiosClient.post(url);
  return result;
};

// 4) Get details of a specific test session
export const getTestDetail = async (
  sessionId: number
): Promise<TestDetailResponse> => {
  const url = `/tests/${sessionId}`;
  const result = await axiosClient.get(url);
  return result;
};

// 5) List all my sessions (optional filter by subject)
export const getMySessions = async (
  subject = ""
): Promise<TestSessionListItem[]> => {
  const url = subject ? `/tests?subject=${subject}` : `/tests`;
  const result = await axiosClient.get(url);
  return result;
};

// ===================================================

const Api = {
  login,
  register,
  startTest,
  getNextItem,
  stopTest,
  getTestDetail,
  getMySessions,
};

export default Api;
