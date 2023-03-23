import express from "express";
import { register, teacher } from "./student-controller.js";
import auth from '../middleware/auth.js'
import cors from 'cors'

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/register', auth, register);
router.post('/register/teacher', auth, teacher);

export default router;
