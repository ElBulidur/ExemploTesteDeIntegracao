import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/appError";
import { IProductUpdate } from "../../interfaces/products";

const productUpdateService = async (id: string, data: IProductUpdate) => {
  const productRepository = AppDataSource.getRepository(Product);

  const product = await productRepository.findOne({ where: { id } });

  if (!product) {
    throw new AppError(409, `Product with ID ${id} not found`);
  }

  if (!data.name) {
    data.name = product.name;
  }
  if (!data.description) {
    data.description = product.description;
  }
  if (!data.price) {
    data.price = product.price;
  }

  await productRepository.update(product!.id, {
    name: data.name,
    description: data.description,
    price: data.price,
  });

  return true;
};

export default productUpdateService;
