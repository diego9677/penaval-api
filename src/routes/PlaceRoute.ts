import { Router } from "express";
import { z } from 'zod';
import { placeController } from "../controllers/PlaceController";
import { validationSchema } from "../middlewares/validationSchema";

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

router.get('', placeController.getAll);
router.post('', validationSchema(createSchema), placeController.create);
router.get('/:id', validationSchema(idSchema), placeController.getOne);
router.put('/:id', validationSchema(updateSchema), placeController.update);
router.delete('/:id', validationSchema(idSchema), placeController.delete);

export default router;