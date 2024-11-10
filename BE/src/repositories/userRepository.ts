import { GetAllUsersParams, IUserRepository } from '../interfaces/userRepository';
import User, { IUser } from '../models/userModel';

class UserRepository implements IUserRepository {
  async createUser(user: IUser): Promise<IUser> {
    const newUser = await User.create(user);
    if (!newUser) {
      throw new Error('Failed to create user');
    }
    if (user.spouse_ids) {
      await User.updateMany({ _id: { $in: user.spouse_ids } }, { $push: { spouse_ids: newUser._id } });
    }
    return newUser;
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async updateUser(id: string, user: IUser): Promise<IUser | null> {
    const existedUser = await User.findById(id).lean();
    if (!existedUser) {
      throw new Error('User not found');
    }
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
    if (user.spouse_ids.some((spouseId) => !existedUser.spouse_ids.includes(spouseId))) {
      await Promise.all([
        User.updateMany({ _id: existedUser._id }, { $pull: { spouse_ids: id } }),
        User.updateMany({ _id: { $in: user.spouse_ids } }, { $addToSet: { spouse_ids: id } })
      ]);
    }
    const isChangeChildren = user.children_ids.length !== existedUser.children_ids.length || !user.children_ids.every((childId) => existedUser.children_ids.includes(childId));
    if (isChangeChildren) {
      await User.updateMany({ _id: { $in: user.spouse_ids } }, { children_ids: user.children_ids } );
    } 

    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id);
    return result !== null;
  }

  async getAllUsers(params: GetAllUsersParams): Promise<{ items: IUser[], total: number }> {
    const { search_text, skip = 0, limit = 10 } = params;  
    const query: any = {};
    if (search_text) {
      query.name = { $regex: search_text, $options: 'i' };
    }
    const [users, total] = await Promise.all([
      User.find(query).skip(skip).limit(limit),
      User.countDocuments(query)
    ]);
    return { items: users, total };
  }

  async getFamilyTree(): Promise<any | null> {
    return await User.findById(process.env.ROOT_USER_ID).populate(['spouses', 'children']).lean();
  }
}

export default UserRepository;
