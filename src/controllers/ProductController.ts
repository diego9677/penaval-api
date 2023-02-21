import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../lib/prisma";

const selectProduct = {
  id: true,
  code: true,
  stock: true,
  price: true,
  measures: true,
  createdAt: true,
  updatedAt: true,
  place: {
    select: {
      id: true,
      name: true,
    }
  },
  brand: {
    select: {
      id: true,
      name: true,
    }
  },
};

class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const productsDb = await prisma.product.findMany({
        select: selectProduct,
        orderBy: {
          id: 'asc'
        }
      });
      return res.status(200).json(productsDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const productDb = await prisma.product.findFirst({ where: { id } });
      if (!productDb) return res.status(404).json({ error: 'Product not found' });
      return res.status(200).json(productDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const createdProductDb = await prisma.product.create({
        data: req.body,
        select: selectProduct,
      });
      return res.status(200).json(createdProductDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const productDb = await prisma.product.findFirst({ where: { id } });
      if (!productDb) return res.status(404).json({ error: 'Product not found' });
      const updatedProductDb = await prisma.product.update({
        data: req.body,
        where: { id },
        select: selectProduct
      });
      return res.status(200).json(updatedProductDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const productDb = await prisma.product.findFirst({ where: { id } });
      if (!productDb) return res.status(404).json({ error: 'Product not found' });
      const deletedProductDb = await prisma.product.delete({
        where: { id },
        select: selectProduct
      });
      return res.status(200).json(deletedProductDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export const productController = new ProductController();