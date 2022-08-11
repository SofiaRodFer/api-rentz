import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Must be possible to create an user authentication token", async () => {
        const user: ICreateUserDTO = {
            driver_license: "00123",
            email: "user@test.com",
            password: "1234",
            name: "User Test",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate a nonexistent user", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "test",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });

    it("Should not me able to authenticate with an incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "9999",
            email: "user*email.com",
            password: "1234",
            name: "User Test Error",
        };

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrect password",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });
});
