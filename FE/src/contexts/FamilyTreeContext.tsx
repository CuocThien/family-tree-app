import React, { createContext, useContext, useState } from 'react';
import { userService } from '../services/userService';
import type { FamilyMember } from '../types';

interface FamilyTreeContextType {
  familyTreeData: FamilyMember | null;
  isLoading: boolean;
  fetchFamilyTree: (rootUserId?: string) => Promise<void>;
}

const FamilyTreeContext = createContext<FamilyTreeContextType | undefined>(undefined);

export const FamilyTreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [familyTreeData, setFamilyTreeData] = useState<FamilyMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFamilyTree = async (rootUserId?: string) => {
    setIsLoading(true);
    try {
      const data = await userService.getFamilyTree(rootUserId);
      setFamilyTreeData(data?.data || {});
    } catch (error) {
      console.error('Failed to fetch family tree:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FamilyTreeContext.Provider value={{ familyTreeData, isLoading, fetchFamilyTree }}>
      {children}
    </FamilyTreeContext.Provider>
  );
};

export const useFamilyTree = () => {
  const context = useContext(FamilyTreeContext);
  if (!context) {
    throw new Error('useFamilyTree must be used within a FamilyTreeProvider');
  }
  return context;
}; 