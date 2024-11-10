import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { userService } from '../services/userService';
import { FamilyMember } from '../types';

interface FamilyTreeContextType {
  familyTreeData: FamilyMember | null;
  refreshFamilyTree: () => Promise<void>;
  isLoading: boolean;
}

const FamilyTreeContext = createContext<FamilyTreeContextType>({
  familyTreeData: null,
  refreshFamilyTree: async () => {},
  isLoading: false
});

export const FamilyTreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [familyTreeData, setFamilyTreeData] = useState<FamilyMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshFamilyTree = useCallback(async () => {
    if (isLoading) return; // Prevent multiple simultaneous calls
    
    try {
      setIsLoading(true);
      const response = await userService.getFamilyTree();
      setFamilyTreeData(response);
    } catch (error) {
      console.error('Failed to fetch family tree:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Initial load
  useEffect(() => {
    refreshFamilyTree();
  }, []);

  return (
    <FamilyTreeContext.Provider value={{ familyTreeData, refreshFamilyTree, isLoading }}>
      {children}
    </FamilyTreeContext.Provider>
  );
};

export const useFamilyTree = () => useContext(FamilyTreeContext); 