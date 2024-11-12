import express from 'express';
import { createUser, deleteUser, getAllUsers, getFamilyTree, getUser, updateUser } from '../controllers/userController';
import { CreateUserSchema, UpdateUserSchema, GetAllUsersSchema } from '../schemas/user';
import { validateSchema } from '../middleware/validateSchema';
import { GetUserSchema } from '../schemas/user/GetUserSchema';

const router = express.Router();

router.post('/', validateSchema(CreateUserSchema, 'body'), createUser);
router.get('/', validateSchema(GetAllUsersSchema, 'query'), getAllUsers);
router.get('/family-tree', getFamilyTree);
router.get('/:id', validateSchema(GetUserSchema, 'params'), getUser);
router.put('/:id', validateSchema(GetUserSchema, 'params'), validateSchema(UpdateUserSchema, 'body'), updateUser);
router.delete('/:id', validateSchema(GetUserSchema, 'params'), deleteUser);

export default router;
