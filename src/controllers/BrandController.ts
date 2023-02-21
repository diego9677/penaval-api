import { Request, Response } from "express";
import prisma from "../lib/prisma";

const selectBrand = {
  id: true,
  name: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  products: {
    select: {
      id: true,
      code: true,
      stock: true,
      measures: true,
      price: true,
    }
  }
};

class BrandController {
  async getAll(req: Request, res: Response) {
    try {
      const search = req.query.search as string;
      const brandsDb = await prisma.brand.findMany({
        where: { name: { contains: search, mode: 'insensitive' } },
        select: selectBrand,
        orderBy: {
          id: 'asc'
        }
      });
      return res.status(200).json(brandsDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const brandDb = await prisma.brand.findFirst({ select: selectBrand, where: { id } });
      if (!brandDb) return res.status(404).json({ error: 'Brand not found' });
      return res.status(200).json(brandDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const brandDb = await prisma.brand.create({
        data: req.body,
        select: selectBrand
      });
      return res.status(200).json(brandDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      console.log(req.body);
      const brandDb = await prisma.brand.findFirst({ where: { id } });
      if (!brandDb) return res.status(404).json({ error: 'Brand not found' });
      const updatedBrandDb = await prisma.brand.update({
        data: req.body,
        where: { id },
        select: selectBrand,
      });
      return res.status(200).json(updatedBrandDb);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const brandDb = await prisma.brand.findFirst({ where: { id } });
      if (!brandDb) return res.status(404).json({ error: 'Brand not found' });
      const deletedBrandDb = await prisma.brand.delete({ select: selectBrand, where: { id } });
      return res.status(200).json(deletedBrandDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export const brandController = new BrandController();