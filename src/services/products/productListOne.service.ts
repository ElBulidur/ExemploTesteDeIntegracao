import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";

const productListOneService = async (name: string) => {
  const productRepository = AppDataSource.getRepository(Product);

  const product = await productRepository.findOne({ where: { name } });

  return product;
};

export default productListOneService;
