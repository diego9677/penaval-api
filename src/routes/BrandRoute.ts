import { Router } from "express";
import { brandController } from "../controllers/BrandController";
import { validationSchema } from "../middlewares/validationSchema";
import { z } from 'zod';

const router = Router();

const createSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
  }).required()
});

const updateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }).required()
});

const idSchema = z.object({
  params: z.object({
    id: z.string()
  })
});

router.get('', brandController.getAll);
router.post('', validationSchema(createSchema), brandController.create);
router.get('/:id', validationSchema(idSchema), brandController.getOne);
router.put('/:id', validationSchema(updateSchema), brandController.update);
router.delete('/:id', validationSchema(idSchema), brandController.delete);

export default router;