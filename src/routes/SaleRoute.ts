import { Router } from "express";
import { z } from "zod";
import { saleControler } from "../controllers/SaleController";
import { validationSchema } from "../middlewares/validationSchema";


const router = Router();

const createSchema = z.object({
  body: z.object({
    nit: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    products: z.array(
      z.object({
        productCode: z.string(),
        quantity: z.number().int().positive(),
        salePrice: z.number().positive(),
      })
    ),
  }).required()
});

router.get('', saleControler.getAll);
router.post('', validationSchema(createSchema), saleControler.create);

export default router;