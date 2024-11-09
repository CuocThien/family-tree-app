import { IUserRepository } from '../interfaces/userRepository';
import { IUser } from '../models/userModel';

class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(userData: IUser): Promise<IUser> {
    return await this.userRepository.createUser(userData);
  }

  async getUser(id: string): Promise<IUser | null> {
    return await this.userRepository.getUserById(id);
  }
}

export default UserService;
