import { Request, Response } from 'express';
import UserService from '../services/userService';
import UserRepository from '../repositories/userRepository';

const userService = new UserService(new UserRepository());

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await userService.getUser(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const success = await userService.deleteUser(req.params.id);
  res.json({ success });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getFamilyTree = async (req: Request, res: Response) => {
  const familyTree = await userService.getFamilyTree();
  res.json(familyTree);
};
