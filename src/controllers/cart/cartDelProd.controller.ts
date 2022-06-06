import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import cartDelProdService from "../../services/cart/cartDelProd.service";

const cartDelProdControle = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req;

    const { product_id } = req.params;

    const cartDel = cartDelProdService(product_id, userEmail);

    return res.sendStatus(204);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default cartDelProdControle;
