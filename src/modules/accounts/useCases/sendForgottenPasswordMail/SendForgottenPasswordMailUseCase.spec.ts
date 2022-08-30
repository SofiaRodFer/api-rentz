import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgottenPasswordMailUseCase } from "./SendForgottenPasswordMailUseCase";

let sendForgottenPasswordMailUseCase: SendForgottenPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgotten Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayJsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();

        sendForgottenPasswordMailUseCase = new SendForgottenPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgotten password email to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "27364",
            email: "aaa@bbb.com",
            name: "aaaa",
            password: "1234",
        });

        await sendForgottenPasswordMailUseCase.execute("aaa@bbb.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to sen an email to an nonexistant user", async () => {
        await expect(
            sendForgottenPasswordMailUseCase.execute("bbb@ccc.com")
        ).rejects.toEqual(new AppError("User does not exist!"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        await usersRepositoryInMemory.create({
            driver_license: "34456",
            email: "DDD@DDD.com",
            name: "aaaDDDa",
            password: "1234",
        });

        await sendForgottenPasswordMailUseCase.execute("DDD@DDD.com");

        expect(generateTokenMail).toBeCalled();
    });
});
