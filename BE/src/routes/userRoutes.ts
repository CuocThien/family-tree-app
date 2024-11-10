import express from 'express';
import { createUser, deleteUser, getAllUsers, getFamilyTree, getUser, updateUser } from '../controllers/userController';
import { CreateUserSchema, UpdateUserSchema, GetAllUsersSchema } from '../schemas/user';
import { validateSchema } from '../middleware/validateSchema';

const router = express.Router();

router.post('/', validateSchema(CreateUserSchema), createUser);
router.get('/', validateSchema(GetAllUsersSchema), getAllUsers);
router.get('/family-tree', getFamilyTree);
router.get('/:id', getUser);
router.put('/:id', validateSchema(UpdateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;
