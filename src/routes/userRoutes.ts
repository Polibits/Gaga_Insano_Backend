import express from 'express'
const router = express.Router();
import UserController from '../controllers/UserController';


router.post('/create' , UserController.createUser);
router.post('/login' , UserController.loginUser)


export default router;