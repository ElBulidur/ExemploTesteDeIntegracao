import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import productDeleteSelfService from "../../services/products/productDeleteSelf.service";

const productDeleteSelfController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await productDeleteSelfService(id);
    return res.status(200).json({ message: "Product deleted with success!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default productDeleteSelfController;
