import userCreateService from "../../../services/user/userCreate.service";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { expect, test, describe, beforeAll, afterAll } from "@jest/globals";
import bcrypt from "bcrypt";
import userListService from "../../../services/user/userList.service";

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
  test("Should the information of users in the database", async () => {
    const userList = await userListService();

    expect(userList).toHaveProperty("map");
  });
});
