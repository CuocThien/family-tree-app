import { IUserRepository } from '../interfaces/userRepository';
import User, { IUser } from '../models/userModel';

class UserRepository implements IUserRepository {
  async createUser(user: IUser): Promise<IUser> {
    return await User.create(user);
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }
}

export default UserRepository;
