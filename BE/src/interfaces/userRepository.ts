import { IUser } from '../models/userModel';

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  getUserById(id: string): Promise<IUser | null>;
  updateUser(id: string, user: IUser): Promise<IUser | null>;
  deleteUser(id: string): Promise<boolean>;
  getAllUsers(): Promise<IUser[]>;
  getFamilyTree(): Promise<IUser | null>;
}
