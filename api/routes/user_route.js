import express from 'express';
import { deleteUser, test,updateUser,getUserListings } from '../controllers/user_controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();
//sending back to client req-request from client and res-response from server.
router.get('/test',test);
router.post('/update/:id',verifyToken, updateUser)
router.delete('/delete/:id',verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
export default router;