import userCreateService from "../../../services/user/userCreate.service";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { expect, test, describe, beforeAll, afterAll } from "@jest/globals";
import bcrypt from "bcrypt";

describe("Create an user", () => {
  let connection: DataSource;

  //conectando no banco
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });
  });

  //desconectando no banco
  afterAll(async () => {
    await connection.destroy();
  });

  //fazendo os tests
  test("Should insert the information of new user in the database", async () => {
    const email = "email@mail.com";
    const name = "name";
    const password = "password";

    const userData = { email, name, password };

    const newUser = await userCreateService(userData);
    const comparePasword = bcrypt.compareSync(password, newUser.password);

    if (comparePasword) {
      newUser.password = password;
    }

    expect(newUser).toEqual(
      expect.objectContaining({
        id: newUser.id,
        name,
        password,
      })
    );
  });
});
