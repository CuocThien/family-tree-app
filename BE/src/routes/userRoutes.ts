import express from 'express';
import { createUser, deleteUser, getAllUsers, getFamilyTree, getUser, updateUser } from '../controllers/userController';
import { CreateUserSchema } from '../schemas/user/CreateUserSchema';
import { validateSchema } from '../middleware/validateSchema';
import { UpdateUserSchema } from '../schemas/user/UpdateUserSchema';

const router = express.Router();

router.post('/', validateSchema(CreateUserSchema), createUser);
router.get('/', getAllUsers);
router.get('/family-tree', getFamilyTree);
router.get('/:id', getUser);
router.put('/:id', validateSchema(UpdateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;
