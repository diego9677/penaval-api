import { Router } from "express";
import { z } from "zod";
import { shoppingController } from "../controllers/ShoppingController";
import { validationSchema } from "../middlewares/validationSchema";


const router = Router();

const createSchema = z.object({
  body: z.object({
    providerId: z.number().int().positive(),
    products: z.array(
      z.object({
        productCode: z.string(),
        quantity: z.number().int().positive(),
        pucharsePrice: z.number().positive(),
        salePrice: z.number().positive(),
      })
    ),
  }).required()
});

router.get('', shoppingController.getAll);
router.post('', validationSchema(createSchema), shoppingController.create);

export default router;