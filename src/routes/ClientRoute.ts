import { Router } from "express";
import { z } from 'zod';
import { clientController } from "../controllers/ClientController";
import { validationSchema } from "../middlewares/validationSchema";

const router = Router();

const createSchema = z.object({
  body: z.object({
    nit: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
  }).required()
});

const updateSchema = z.object({
  body: z.object({
    nit: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
  }).required()
});

const idSchema = z.object({
  params: z.object({
    id: z.string()
  })
});

router.get('', clientController.getAll);
router.post('', validationSchema(createSchema), clientController.create);
router.get('/:id', validationSchema(idSchema), clientController.getOne);
router.put('/:id', validationSchema(updateSchema), clientController.update);
router.delete('/:id', validationSchema(idSchema), clientController.delete);


export default router;