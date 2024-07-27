import express from 'express';
import { test,updateUser } from '../controllers/user_controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();
//sending back to client req-request from client and res-response from server.
router.get('/test',test);
router.post('/update/:id',verifyToken, updateUser)
export default router;