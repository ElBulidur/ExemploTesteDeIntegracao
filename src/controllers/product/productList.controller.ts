import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IProduct } from "../../interfaces/products";
import productListService from "../../services/products/productList.service";

const productListController = async (req: Request, res: Response) => {
  try {
    const productList: IProduct[] = await productListService();

    return res.send(productList);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default productListController;
