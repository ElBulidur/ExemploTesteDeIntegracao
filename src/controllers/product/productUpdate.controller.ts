import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IProductUpdate } from "../../interfaces/products";
import productUpdateService from "../../services/products/productUpdate.service";

const productUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: IProductUpdate = req.body;

    await productUpdateService(id, data);
    return res.status(201).json({ message: "Product updated!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default productUpdateController;
