import mongoose from 'mongoose';
import { IUser } from '../models/userModel';

export const buildFamilyTree = (rootUser: IUser, usersMap: Record<string, IUser>) => {
  // Create a deep copy to avoid modifying the original object
  const userCopy = { ...rootUser };
  
  // Build spouse relationships
  if (userCopy.spouse_ids && userCopy.spouse_ids.length > 0) {
    userCopy.spouses = userCopy.spouse_ids
      .map(id => {
        const spouseId = id.toString();
        const spouse = usersMap[spouseId];
        if (!spouse) return null;
        
        // Create a clean copy without circular references
        const spouseCopy = {
          _id: spouse._id,
          name: spouse.name,
          gender: spouse.gender,
          birth_date: spouse.birth_date,
          death_date: spouse.death_date,
          avatar: spouse.avatar,
          spouse_ids: spouse.spouse_ids || [],
          children_ids: spouse.children_ids || [],
        };
        return spouseCopy;
      })
      .filter(Boolean) as IUser[];
  }

  // Build children relationships
  if (userCopy.children_ids && userCopy.children_ids.length > 0) {
    userCopy.children = userCopy.children_ids
      .map(id => {
        const childId = id.toString();
        const child = usersMap[childId];
        if (!child) return null;

        // Recursively build family tree for each child
        return buildFamilyTree(child, usersMap);
      })
      .filter(Boolean) as IUser[];
  }

  return userCopy;
};
