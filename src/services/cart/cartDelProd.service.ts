import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { fixedFloat } from "../../utils";

const cartDelProdService = async (product_id: string, userEmail: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);

  const user = await userRepository.findOne({ where: { email: userEmail } });

  const cart = await cartRepository.findOne({ where: { id: user?.cart.id } });

  if (cart) {
    if (cart.products.filter((prod) => prod.id === product_id).length === 0) {
      throw new AppError(404, "Product is not the cart");
    }
    cart.products = cart.products.filter((prod) => prod.id !== product_id);
    cart.subTotal = fixedFloat(
      cart.products.reduce((acc, prod) => acc + prod.price, 0)
    );

    await cartRepository.save(cart);

    return;
  }
};

export default cartDelProdService;
