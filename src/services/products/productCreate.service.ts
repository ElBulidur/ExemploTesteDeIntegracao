import { Product } from "../../entities/product.entity";
import { IProductCreate } from "../../interfaces/products";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const productCreateService = async ({
  name,
  description,
  price,
}: IProductCreate) => {
  const productRepository = AppDataSource.getRepository(Product);

  const productExists = await productRepository.findOne({ where: { name } });

  if (productExists) {
    throw new AppError(409, "Product Already Exists");
  }

  const product = new Product();
  product.name = name;
  product.description = description;
  product.price = price;

  productRepository.create(product);
  await productRepository.save(product);

  return product;
};

export default productCreateService;
