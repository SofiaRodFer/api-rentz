import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("List Category Controller", () => {
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

    it("should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentz.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Category Supertest");
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });
});
