import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import cartAddProdService from "../../services/cart/cartAddProd.service";

const cartAddProdControle = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req;

    const { product_id } = req.body;

    const cartAdd = await cartAddProdService(product_id, userEmail);

    return res.status(200).send(cartAdd);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default cartAddProdControle;
