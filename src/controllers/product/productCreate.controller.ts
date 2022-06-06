import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IProduct } from "../../interfaces/products";
import productCreateService from "../../services/products/productCreate.service";

const productCreateController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const newProduct: IProduct = await productCreateService(data);

    return res.status(201).send(newProduct);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default productCreateController;
