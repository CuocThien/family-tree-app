import { IUser } from '../models/userModel';

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  getUserById(id: string): Promise<IUser | null>;
}
