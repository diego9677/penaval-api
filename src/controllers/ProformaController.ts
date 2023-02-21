import { Request, Response } from "express";
import prisma from "../lib/prisma";

const selectProforma = {
  id: true,
  user: {
    select: {
      id: true,
      username: true,
      person: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    }
  },
  updatedAt: true,
  createdAt: true,
};


class ProformaController {
  async getAll(req: Request, res: Response) {
    try {
      const proformasDb = await prisma.proforma.findMany({
        select: selectProforma,
        orderBy: {
          id: 'asc'
        }
      });
      return res.status(200).json(proformasDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const proformaDb = await prisma.proforma.findFirst({ where: { id } });
      if (!proformaDb) return res.status(404).json({ error: 'Proforma not found' });
      return res.status(200).json(proformaDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const createdProformaDb = await prisma.proforma.create({
        data: { ...req.body, userId: req.user?.id },
        select: selectProforma,
      });
      return res.status(200).json(createdProformaDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const proformaDb = await prisma.proforma.findFirst({ where: { id } });
      if (!proformaDb) return res.status(404).json({ error: 'Proforma not found' });
      const updatedProformaDb = await prisma.proforma.update({
        data: { ...req.body, userId: req.user?.id },
        where: { id },
        select: selectProforma,
      });

      return res.status(200).json(updatedProformaDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const proformaDb = await prisma.proforma.findFirst({ where: { id } });
      if (!proformaDb) return res.status(404).json({ error: 'Proforma not found' });
      const deltedProformaDb = await prisma.proforma.delete({
        where: { id },
        select: selectProforma
      });

      return res.status(200).json(deltedProformaDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export const proformaController = new ProformaController();