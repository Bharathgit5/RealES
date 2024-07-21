import express from 'express';
import { test } from '../controllers/user_controller.js';

const router = express.Router();
//sending back to client req-request from client and res-response from server.
router.get('/test',test);
export default router;