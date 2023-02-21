import { Request, Response } from "express";


class ShoppingController {
  async getAll(req: Request, res: Response) {
    try {

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