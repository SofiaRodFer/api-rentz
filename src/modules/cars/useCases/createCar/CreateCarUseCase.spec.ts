import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC1234",
            fine_amount: 60,
            brand: "Brand Car",
            category_id: "category",
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car that already exists", async () => {
        await createCarUseCase.execute({
            name: "Car1",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC1234",
            fine_amount: 60,
            brand: "Brand Car",
            category_id: "category",
        });

        await expect(
            createCarUseCase.execute({
                name: "Car2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC1234",
                fine_amount: 60,
                brand: "Brand Car",
                category_id: "category",
            })
        ).rejects.toEqual(new AppError("Car already exists!"));
    });

    it("Must make new cars available by default ", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Available",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABCD123",
            fine_amount: 60,
            brand: "Brand Car",
            category_id: "category",
        });

        expect(car.available).toBe(true);
    });
});
