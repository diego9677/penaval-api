import { Router } from "express";
import { z } from 'zod';
import { proformaController } from "../controllers/ProformaController";
import { validationSchema } from "../middlewares/validationSchema";

const router = Router();

const createSchema = z.object({
  body: z.object({
    clientId: z.number().int(),
  }).required()
});

const updateSchema = z.object({
  body: z.object({
    clientId: z.number().int().optional(),
  }).required()
});

const idSchema = z.object({
  params: z.object({
    id: z.string()
  })
});

router.get('', proformaController.getAll);
router.post('', validationSchema(createSchema), proformaController.create);
router.get('/:id', validationSchema(idSchema), proformaController.getOne);
router.put('/:id', validationSchema(updateSchema), proformaController.update);
router.delete('/:id', validationSchema(idSchema), proformaController.delete);

export default router;