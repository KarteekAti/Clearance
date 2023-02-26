import express from "express";
import { register } from "./student-controller.js";
import auth from '../middleware/auth.js'
import cors from 'cors'

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/register', auth, register);

export default router;
