export interface UserInterface {
  id: string;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
  role: string;
  email: string;
  first_name: string;
  last_name: string;
  api_token: string | null;
  metadata: string | null;
}
