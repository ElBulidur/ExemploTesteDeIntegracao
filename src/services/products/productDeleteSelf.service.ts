import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";

const productDeleteSelfService = async (name: string) => {
  const productRepository = AppDataSource.getRepository(Product);

  const product = await productRepository.findOne({ where: { name } });

  await productRepository.delete(product!.id);

  return true;
};

export default productDeleteSelfService;
