import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/useCases/createCategory/CreateCategoryUseCase";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
});

categoriesRoutes.get("/", (req, res) => {
    const all = categoriesRepository.list();

    return res.json(all);
});

export { categoriesRoutes };
