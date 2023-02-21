import { Request, Response } from "express";
import prisma from "../lib/prisma";

const selectProvider = {
  id: true,
  name: true,
  address: true,
  createdAt: true,
  updatedAt: true,
};

class ProviderController {
  async getAll(req: Request, res: Response) {
    try {
      const search = req.query.search as string;
      const providersDb = await prisma.provider.findMany({
        where: { name: { contains: search, mode: 'insensitive' } },
        select: selectProvider,
        orderBy: { id: 'asc' }
      });
      return res.status(200).json(providersDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const providerDb = await prisma.provider.findFirst({ select: selectProvider, where: { id } });
      if (!providerDb) return res.status(200).json({ error: 'Provider not found' });
      return res.status(200).json(providerDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const createdProviderDb = await prisma.provider.create({
        data: req.body,
        select: selectProvider,
      });
      return res.status(200).json(createdProviderDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const providerDb = await prisma.provider.findFirst({ select: selectProvider, where: { id } });
      if (!providerDb) return res.status(200).json({ error: 'Provider not found' });

      const updatedProviderDb = await prisma.provider.update({
        data: req.body,
        select: selectProvider,
        where: { id }
      });
      return res.status(200).json(updatedProviderDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const providerDb = await prisma.provider.findFirst({ select: selectProvider, where: { id } });
      if (!providerDb) return res.status(200).json({ error: 'Provider not found' });

      const deletedProviderDb = await prisma.provider.delete({
        where: { id },
        select: selectProvider
      });

      return res.status(200).json(deletedProviderDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export const providerController = new ProviderController();