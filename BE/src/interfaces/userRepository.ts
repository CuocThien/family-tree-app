import { IUser } from '../models/userModel';

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  getUserById(id: string): Promise<IUser | null>;
  updateUser(id: string, user: IUser): Promise<IUser | null>;
  deleteUser(id: string): Promise<boolean>;
  getAllUsers(params: GetAllUsersParams): Promise<{ items: IUser[], total: number }>;
  getFamilyTree(rootUserId?: string): Promise<IUser | null>;
}

export type GetAllUsersParams = {
  search_text?: string;
  skip?: number;
  limit?: number;
};
