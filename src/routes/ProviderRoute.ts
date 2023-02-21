import { Router } from "express";
import { z } from 'zod';
import { providerController } from "../controllers/ProviderController";
import { validationSchema } from "../middlewares/validationSchema";

const router = Router();

const createSchema = z.object({
  body: z.object({
    name: z.string(),
    address: z.string(),
  }).required()
});

const updateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    address: z.string().optional(),
  }).required()
});

const idSchema = z.object({
  params: z.object({
    id: z.string()
  })
});

const searchQuerySchema = z.object({
  query: z.object({
    search: z.string().optional()
  }).optional()
});

router.get('', validationSchema(searchQuerySchema), providerController.getAll);
router.post('', validationSchema(createSchema), providerController.create);
router.get('/:id', validationSchema(idSchema), providerController.getOne);
router.put('/:id', validationSchema(updateSchema), providerController.update);
router.delete('/:id', validationSchema(idSchema), providerController.delete);

export default router;