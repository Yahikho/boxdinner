import express from "express";
import { 
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory
} from "../controller/cantegoriesController";

const routerCategories = express.Router();

routerCategories.get('/boxdinner/categories', getAllCategories);
routerCategories.get('/boxdinner/categories/:id', getCategory)
routerCategories.post('/boxdinner/categories', createCategory)
routerCategories.put('/boxdinner/categories/:id', updateCategory)

export default routerCategories;