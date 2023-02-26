import { Request, Response } from "express";
import { ShoppingProducts } from "../interfaces";
import prisma from '../lib/prisma';

const selectShopping = {
  id: true,
  createdAt: true,
  updatedAt: true,
  provider: {
    select: {
      id: true,
      name: true,
    }
  },
  shoppingDetail: {
    select: {
      id: true,
      quantity: true,
      pucharsePrice: true,
      salePrice: true,
      product: {
        select: {
          id: true,
          code: true,
        }
      }
    }
  }
};

class ShoppingController {
  async getAll(req: Request, res: Response) {
    try {
      const begin = req.query.begin as string;
      const end = req.query.end as string;
      const shoppingDb = await prisma.shopping.findMany({
        where: {
          createdAt: {
            gte: begin,
            lte: end,
          }
        },
        select: selectShopping,
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(shoppingDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getOne(req: Request, res: Response) {
    try {

    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const providerId = req.body.providerId as number;
      const products = req.body.products as ShoppingProducts[];
      const craetedShoppingDb = await prisma.shopping.create({
        select: selectShopping,
        data: {
          provider: { connect: { id: providerId } },
          user: { connect: { id: req.user?.id } },
          shoppingDetail: {
            createMany: {
              data: products.map((p) => ({ productId: p.productId, quantity: p.quantity, pucharsePrice: p.pucharsePrice, salePrice: p.salePrice }))
            }
          }
        },
      });

      for (const product of products) {
        await prisma.product.update({
          where: { id: product.productId },
          data: {
            stock: { increment: product.quantity },
            price: product.salePrice
          }
        });
      }

      return res.status(200).json(craetedShoppingDb);

    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {

    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {

    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export const shoppingController = new ShoppingController();