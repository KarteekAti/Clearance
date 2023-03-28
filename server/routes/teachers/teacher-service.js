import express from "express";
import auth from '../../middleware/auth.js'
import { createClass, joinClass, register } from "./teacher-controller.js";
import cors from 'cors'

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/register', auth, register);
router.post('/createClass', auth, createClass);
router.post('/joinClass', auth, joinClass);

export default router;
