import express from 'express';
import { signup } from '../controllers/auth_controller.js';
//.js is must after import
const router = express.Router();


router.post('/signup', signup)
export default router;