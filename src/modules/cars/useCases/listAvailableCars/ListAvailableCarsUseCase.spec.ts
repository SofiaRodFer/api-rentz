import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car Description",
            daily_rate: 140,
            license_plate: "123123",
            fine_amount: 100,
            brand: "Audi",
            category_id: "fac93318-4b99-4f16-ba54-56ead8ce194d",
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars ordered by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car Description",
            daily_rate: 140,
            license_plate: "123123",
            fine_amount: 100,
            brand: "Car_Brand_Test",
            category_id: "fac93318-4b99-4f16-ba54-56ead8ce194d",
        });

        const cars = await listCarsUseCase.execute({
            brand: "Car_Brand_Test",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars ordered by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car Description",
            daily_rate: 140,
            license_plate: "125623",
            fine_amount: 100,
            brand: "Car_Brand_Test",
            category_id: "fac93318-4b99-4f16-ba54-56ead8ce194d",
        });

        const cars = await listCarsUseCase.execute({
            name: "Car3",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars ordered by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car4",
            description: "Car Description",
            daily_rate: 140,
            license_plate: "12545623",
            fine_amount: 100,
            brand: "Car_Brand_Test",
            category_id: "1234",
        });

        const cars = await listCarsUseCase.execute({
            category_id: "1234",
        });

        expect(cars).toEqual([car]);
    });
});
