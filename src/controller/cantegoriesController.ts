import { Categories } from "@prisma/client";
import { Request, Response } from "express";
import { 
    getCategories as getAllCategoriesService, 
    getCategory as getCategoryService,
    createCategory as createCategoryService,
    updateCategory as updateCategoryService,
    getCategoryByName as getCategoryByNameService
} from "../services/categoriesService";

export const getAllCategories = async (_req: Request, res: Response) => {
    try{
        const categories = await getAllCategoriesService();
        res.status(201)
        .json({
            response : true,
            message: "true",
            data : categories
        })
    }catch(Error){
        res.status(500)
        .json({
            response : false,
            message : `No se pudo realizar la petición, error => ${Error}`
        })
    }
}

export const getCategory = async(req: Request, res: Response) => {
    try{
        const id: number = Number(req.params.id);
        const category = await getCategoryService(id);
        res.status(200);
        res.json({
            response: true,
            message : "true",
            data: category
        });
    }catch(Error){
        res.status(500)
        .json({
            response : false,
            message : `No se pudo realizar la petición, error => ${Error}`
        })
    }
}

export const createCategory = async(req:Request, res: Response) => {
    try{
        const body: Categories = req.body;
        const searchCategory =  await getCategoryByNameService(body.name);
        if(searchCategory.length > 0){
            res.status(200);
            res.json({
                response: false,
                message: "Ese nombre de categoría ya existe.",
            });
        }else{
            const category = await createCategoryService(body);
            res.status(201);
            res.json({
                response: true,
                message: "Categoría creada con exito.",
                data: category
            });
        }
    }catch(Error){
        res.status(500)
        .json({
            response : false,
            message : `No se pudo realizar la petición, error => ${Error}`
        });
    }
}

export const updateCategory = async(req:Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const data: Categories = req.body;
        const searchCategory = await getCategoryByNameService(data.name);
        if(searchCategory.length > 0 && searchCategory[0].name !== data.name){
            res.status(200);
            res.json({
                response: false,
                message: "Ese nombre de categoría ya existe.",
            });
        }else{
            const brand = await updateCategoryService(id,data);
            res.status(201);
            res.json({
                response: true,
                message: "Categoria actualizada con exito.",
                data: brand
            });
        }
    }catch(Error){
        res.status(500)
        .json({
            response : false,
            message : `No se pudo realizar la petición, error => ${Error}`
        });
    }
}