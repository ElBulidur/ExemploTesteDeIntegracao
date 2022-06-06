import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import productListOneService from "../../services/products/productListOne.service";

const productListOneController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await productListOneService(id);
    return res.status(200).json(product);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default productListOneController;
