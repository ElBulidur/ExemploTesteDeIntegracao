import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import { expect, test, describe, beforeAll, afterAll } from "@jest/globals";
import bcrypt from "bcrypt";
import request from "supertest";
import app from "../../app";

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

    const response = await request(app).post("/users").send(userData);
    const comparePasword = bcrypt.compareSync(password, response.body.password);

    if (comparePasword) {
      response.body.password = password;
    }

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name,
        email,
        password,
      })
    );
  });

  //fazendo os tests

  test("Should the information of users in the database", async () => {
    const email = "email@mail.com";
    const password = "password";

    const userData = { email, password };
    let response = await request(app).post("/users/login").send(userData);
    response = await request(app)
      .get("/users")
      .set("Authorization", "bearer " + response.body.token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });
});
