import { Request, Response } from "express";
import prisma from "../lib/prisma";

const selectPalce = {
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
      price: true,
      measures: true
    }
  }
};

class PlaceController {
  async getAll(req: Request, res: Response) {
    try {
      const search = req.query.search as string;
      const placesDb = await prisma.place.findMany({
        where: { name: { contains: search, mode: 'insensitive' } },
        select: selectPalce,
        orderBy: {
          id: 'asc'
        }
      });
      return res.status(200).json(placesDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const placeDb = await prisma.place.findFirst({ where: { id } });
      if (!placeDb) return res.status(404).json({ error: 'Place not found' });
      return res.status(200).json(placeDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const createdPlaceDb = await prisma.place.create({
        data: req.body,
        select: selectPalce,
      });
      return res.status(200).json(createdPlaceDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const placeDb = await prisma.place.findFirst({ where: { id } });
      if (!placeDb) return res.status(404).json({ error: 'Place not found' });
      const updatedplaceDb = await prisma.place.update({
        data: req.body,
        where: { id },
        select: selectPalce
      });
      return res.status(200).json(updatedplaceDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const placeDb = await prisma.place.findFirst({ where: { id } });
      if (!placeDb) return res.status(404).json({ error: 'Place not found' });
      const deletedPlaceDb = await prisma.place.delete({
        where: { id },
        select: selectPalce
      });
      return res.status(200).json(deletedPlaceDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export const placeController = new PlaceController();