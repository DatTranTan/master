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
  const result = await axiosClient.post<StartTestResponse>(`/tests/start`, {
    subject,
  });

  return result; // <--- vì interceptor đã trả JSON thuần
};

// 2) Get next adaptive item
export const getNextItem = async (
  sessionId: number,
  response: 0 | 1 | null
): Promise<NextItemResponse> => {
  const result = await axiosClient.post<NextItemResponse>(
    `/tests/${sessionId}/next`,
    { response }
  );

  return result;
};

// 3) Stop test session
export const stopTest = async (
  sessionId: number
): Promise<StopTestResponse> => {
  const result = await axiosClient.post<StopTestResponse>(
    `/tests/${sessionId}/stop`
  );
  return result;
};

// 4) Get details of a specific test session
export const getTestDetail = async (
  sessionId: number
): Promise<TestDetailResponse> => {
  const result = await axiosClient.get<TestDetailResponse>(
    `/tests/${sessionId}`
  );
  return result;
};

// 5) List all my sessions (optional filter by subject)
export const getMySessions = async (
  subject = ""
): Promise<TestSessionListItem[]> => {
  const url = subject ? `/tests?subject=${subject}` : `/tests`;

  const result = await axiosClient.get<TestSessionListItem[]>(url);
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
