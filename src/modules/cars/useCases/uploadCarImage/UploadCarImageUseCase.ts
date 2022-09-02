import { inject, injectable } from "tsyringe";

import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
    constructor(
        @inject("CarsImageRepository")
        private carsImagesRepository: ICarsImageRepository,
        @inject("StorageProvider")
        private storageProvder: IStorageProvider
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image);
            await this.storageProvder.save(image, "cars");
        });
    }
}

export { UploadCarImageUseCase };
