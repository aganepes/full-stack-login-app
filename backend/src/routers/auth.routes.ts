import {Router} from "express";
import {login,register,logout,refreshToken,me} from '../controllers/auth.controller';
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.post('/register',register);
router.post('/login',login);
router.post('/refresh-token',refreshToken);
router.post('/logout',logout);
router.get('/me',checkAuth,me);

export default router;