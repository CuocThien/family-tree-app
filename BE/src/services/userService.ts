import { GetAllUsersParams, IUserRepository } from '../interfaces/userRepository';
import { IUser } from '../models/userModel';

class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(userData: IUser): Promise<IUser> {
    return await this.userRepository.createUser(userData);
  }

  async getUser(id: string): Promise<IUser | null> {
    return await this.userRepository.getUserById(id);
  }

  async updateUser(id: string, userData: IUser): Promise<IUser | null> {
    return await this.userRepository.updateUser(id, userData);
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.deleteUser(id);
  }

  async getAllUsers(params: GetAllUsersParams): Promise<{ items: IUser[], total: number }> {
    return await this.userRepository.getAllUsers(params);
  }

  async getFamilyTree(): Promise<any> {
    return await this.userRepository.getFamilyTree();
  }
}

export default UserService;
