import { Request, Response } from "express";
import prisma from "../lib/prisma";

const selectClient = {
  id: true,
  nit: true,
  createdAt: true,
  updatedAt: true,
  person: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true
    }
  }
};

class ClientController {
  async getAll(req: Request, res: Response) {
    try {
      const clientsDb = await prisma.client.findMany({
        select: selectClient,
        orderBy: {
          id: 'asc'
        }
      });
      return res.status(200).json(clientsDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const clientDb = await prisma.client.findFirst({ select: selectClient, where: { id } });
      if (!clientDb) return res.status(404).json({ error: 'Client not found' });
      return res.status(200).json(clientDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { nit, firstName, lastName, phone } = req.body;
      const createdClientDb = await prisma.client.create({
        data: {
          nit,
          person: {
            create: {
              firstName,
              lastName,
              phone
            }
          }
        },
        select: selectClient,
      });
      return res.status(200).json(createdClientDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { nit, firstName, lastName, phone } = req.body;
      const clientDb = await prisma.client.findFirst({ select: selectClient, where: { id } });
      if (!clientDb) return res.status(404).json({ error: 'Client not found' });
      const updatedClientDb = await prisma.client.update({
        data: {
          nit,
          person: {
            update: {
              firstName,
              lastName,
              phone
            }
          }
        },
        where: { id },
        select: selectClient
      });
      return res.status(200).json(updatedClientDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const clientDb = await prisma.client.findFirst({ select: selectClient, where: { id } });
      if (!clientDb) return res.status(404).json({ error: 'Client not found' });
      const deletedClientDb = await prisma.client.delete({
        where: { id },
        select: selectClient
      });
      return res.status(200).json(deletedClientDb);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export const clientController = new ClientController();
