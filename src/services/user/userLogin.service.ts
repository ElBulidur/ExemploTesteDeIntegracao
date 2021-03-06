import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.email === email);

  if (!account) {
    throw new AppError(403, "Email ou senha inválidos");
  }

  const passwordMatch = bcrypt.compareSync(password, account.password);

  if (!passwordMatch) {
    throw new AppError(403, "Email ou senha inválidos");
  }

  const token = jwt.sign({ email: email }, String(process.env.JWT_SECRET), {
    expiresIn: "24h",
  });

  return token;
};

export default userLoginService;
