export interface ApiResponse<T = any> {
  status: number;
  message: string;
  errors?: string[] | null;
  data?: T | null;
} 