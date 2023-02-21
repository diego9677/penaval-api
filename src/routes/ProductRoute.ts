import { Router } from "express";
import { z } from 'zod';
import { productController } from "../controllers/ProductController";
import { validationSchema } from "../middlewares/validationSchema";

const router = Router();

const createSchema = z.object({
  body: z.object({
    code: z.string(),
    measures: z.string(),
    price: z.number(),
    placeId: z.number().int(),
    brandId: z.number().int(),
  }).required()
});

const updateSchema = z.object({
  body: z.object({
    code: z.string().optional(),
    measures: z.string().optional(),
    price: z.number().optional(),
    placeId: z.number().int().optional(),
    brandId: z.number().int().optional(),
  }).required()
});

const idSchema = z.object({
  params: z.object({
    id: z.string()
  })
});

router.get('', productController.getAll);
router.post('', validationSchema(createSchema), productController.create);
router.get('/:id', validationSchema(idSchema), productController.getOne);
router.put('/:id', validationSchema(updateSchema), productController.update);
router.delete('/:id', validationSchema(idSchema), productController.delete);

export default router;