export type RegisterType = {
  username?: string;
  password?: string;
  email?: string;
  full_name?: string;
};

export type StartTestRequest = {
  subject: string;
};

export type StartTestResponse = {
  session_id: number;
  student_id: number;
  subject: string;
  theta: number;
  standard_error: number | null;
  total_items: number;
  is_completed: boolean;
  session_expiry: string;
  created_at: string;
};

export type NextItemRequest = {
  response: number | null;
};

export type NextItemResponse = {
  question_id: number;
  content: string;
  choices: string[];
  difficulty: number;
  current_theta: number;
  items_remaining: number;
};

export type StopTestResponse = {
  session_id: number;
  student_id: number;
  subject: string;
  final_theta: number;
  final_standard_error: number;
  total_items: number;
  administered_items: number[];
  score_percentage: number;
  reliability: number;
  completed_at: string;
};

export type TestDetailResponse = {
  session_id: number;
  student_id: number;
  subject: string;
  theta: number;
  standard_error: number;
  administered_items: number[];
  total_items: number;
  is_completed: boolean;
  final_theta: number | null;
  final_standard_error: number | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  session_expiry: string;
  is_expired: boolean;
};

export type TestSessionListItem = {
  session_id: number;
  student_id: number;
  subject: string;
  theta: number;
  is_completed: boolean;
  total_items: number;
};
