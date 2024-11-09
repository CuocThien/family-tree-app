import express from 'express';
import { createUser, getUser } from '../controllers/userController';
import { CreateUserSchema } from '../schemas/user/CreateUserSchema';
import { validateSchema } from '../middleware/validateSchema';

const router = express.Router();

router.post('/', validateSchema(CreateUserSchema), createUser);
router.get('/:id', getUser);

export default router;
