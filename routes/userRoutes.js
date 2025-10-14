import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', userController.addUser);
router.delete('/:index', userController.deleteUser);

export { router }