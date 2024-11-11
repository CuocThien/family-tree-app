import { GetAllUsersParams, IUserRepository } from '../interfaces/userRepository';
import User, { IUser } from '../models/userModel';
import { keyBy} from 'lodash';
import { buildFamilyTree } from '../utils/functions';

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

  async getUserById(id: string): Promise<any | null> {
    return await User.findById(id).populate('spouses').populate('children').lean();
  }

  async updateUser(id: string, user: IUser): Promise<IUser | null> {
    const existedUser = await User.findOne({ _id: id, is_deleted: false }).lean();
    if (!existedUser) {
      throw new Error('User not found');
    }
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
    const promises = [];
    if (existedUser.spouse_ids.length > 0 && !user.spouse_ids.length) {
      promises.push(User.updateMany({ _id: { $in: existedUser.spouse_ids } }, { $pull: { spouse_ids: id } }));
    }
    if (user.spouse_ids.some((spouseId) => !existedUser.spouse_ids.includes(spouseId))) {
      promises.push(User.updateMany({ _id: { $in: user.spouse_ids } }, { $addToSet: { spouse_ids: id } }));
    }
    const isChangeChildren = user.children_ids.length !== existedUser.children_ids.length || !user.children_ids.every((childId) => existedUser.children_ids.includes(childId));
    if (isChangeChildren) {
      promises.push(User.updateMany({ _id: { $in: user.spouse_ids } }, { children_ids: user.children_ids }));
    }
    await Promise.all(promises);

    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const existedUser = await User.findOne({ _id: id, is_deleted: false }).lean();
    if (!existedUser) {
      throw new Error('User not found');
    }
    await Promise.all([
      User.updateOne({ _id: id }, { is_deleted: true }),
      User.updateMany({ _id: { $in: existedUser.spouse_ids } }, { $pull: { spouse_ids: id } }),
      User.updateMany({ children_ids: id }, { $pull: { children_ids: id } })
    ]);
    return true;
  }

  async getAllUsers(params: GetAllUsersParams): Promise<{ items: IUser[], total: number }> {
    const { search_text, skip = 0, limit = 10 } = params;
    const query: any = {
      is_deleted: false
    };
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
    const [rootUser, allUsers] = await Promise.all([
      User.findById(process.env.ROOT_USER_ID).lean(),
      User.find({ is_deleted: false }).lean()
    ]);
    if (!rootUser) {
      throw new Error('Root user not found');
    }
    const objUser = keyBy(allUsers, '_id');
    const familyTree = buildFamilyTree(rootUser as IUser, objUser as Record<string, IUser>);
    return familyTree;
  }
}

export default UserRepository;
