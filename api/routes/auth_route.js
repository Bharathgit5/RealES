import express from 'express';
import { signup } from '../controllers/auth_controller.js';
import { signin } from '../controllers/auth_controller.js';
import { google } from '../controllers/auth_controller.js';
//.js is must after import
const router = express.Router();


router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', google)
export default router;