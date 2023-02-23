import { Request, Response } from "express";
import { SaleProducts } from "../interfaces";
import prisma from '../lib/prisma';

const selectSale = {
  id: true,
  client: {
    select: {
      id: true,
      nit: true,
      person: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          phone: true,
        }
      }
    }
  },
  saleDetail: {
    select: {
      id: true,
      quantity: true,
      salePrice: true,
      product: {
        select: {
          id: true,
          code: true
        }
      }
    }
  },
  createdAt: true,
};

class SaleController {
  async getAll(req: Request, res: Response) {
    try {
      try {
        const begin = req.query.begin as string;
        const end = req.query.end as string;
        const salesDb = await prisma.sale.findMany({
          where: {
            createdAt: {
              gte: begin,
              lte: end,
            }
          },
          select: selectSale,
          orderBy: { createdAt: 'desc' }
        });
        return res.status(200).json(salesDb);
      } catch (error) {
        return res.status(500).json({ error });
      }
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
      const { nit, firstName, lastName, phone } = req.body;
      const products = req.body.products as SaleProducts[];
      let clientDb = await prisma.client.findUnique({ where: { nit } });
      if (!clientDb) {
        clientDb = await prisma.client.create({
          data: {
            nit,
            person: {
              create: {
                firstName,
                lastName,
                phone
              }
            }
          }
        });
      }

      await prisma.client.update({
        where: { nit },
        data: { nit, person: { update: { firstName, lastName, phone } } }
      });

      const craetedShoppingDb = await prisma.sale.create({
        select: selectSale,
        data: {
          client: { connect: { id: clientDb.id } },
          user: { connect: { id: req.user?.id } },
          saleDetail: {
            createMany: {
              data: products.map((p) => ({ productId: p.productId, quantity: p.quantity, salePrice: p.salePrice }))
            }
          }
        },
      });

      for (const product of products) {
        await prisma.product.update({
          where: { id: product.productId },
          data: {
            stock: { decrement: product.quantity }
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

export const saleControler = new SaleController();