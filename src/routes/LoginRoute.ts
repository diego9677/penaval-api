import { Router } from "express";
import { z } from "zod";
import { loginController } from "../controllers/LoginController";
import { validationSchema } from "../middlewares/validationSchema";


const router = Router();

const loginSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string().min(5)
  }).required()
});

router.post('', validationSchema(loginSchema), loginController.login);
router.get('/me', loginController.whoiam);

export default router;