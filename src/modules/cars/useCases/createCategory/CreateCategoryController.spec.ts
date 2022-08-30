import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidv4();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO Users (id, name, email, password, "isAdmin", driver_license, created_at)
        VALUES (
          '${id}',
          'admin',
          'admin@rentz.com.br',
          '${password}',
          true,
          '0123456789',
          NOW()
        )
      `
        );
    });

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentz.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
    });

    it("should not be able to create a new category with an already existing name", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentz.com.br",
            password: "admin",
        });

        const { refresh_token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest",
            })
            .set({
                Authorization: `Bearer ${refresh_token}`,
            });

        expect(response.status).toBe(400);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });
});
