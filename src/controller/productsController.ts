import { Request, Response } from "express";
import { Categories, Products } from "@prisma/client";

import { 
    getProducts as getProductsService, 
    getProduct as getProductService,
    createProduct as createProductService,
    updateProduct as updateProductService,
    getProductByName as getProductByNameService,
    subtractQuantityProduct as subtractQuantityProductService,
    addQuantityProduct as addQuantityProductService,
    getProductsByCaregory as getProductsByCaregoryService,
    updateProductByCategory as updateProductByCategoryService
} from "../services/productsService";
import { getCategory as getCategoryService } from "../services/categoriesService";
import { roudedPrice } from "../utils/roudedPrices";

export const getProducts = async (_req:Request, res:Response) => {
    try{
        const products = await getProductsService();
        res.status(200);
        res.json({
            response: true,
            message : 'true',
            data: products
        });
    }catch(Error){
        res.status(500)
        .json({
            response : false,
            message : `No se pudo realizar la petición, error => ${Error}`
        });
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const product = await getProductService(Number(id))
        res.status(400);
        res.json({
            response: true,
            message : "true",
            data: product
        });
    }catch(Error){
        res.status(500)
        .json({
            response : false,
            message : `No se pudo realizar la petición, error => ${Error}`
        });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try{
        const body: Products = req.body;
        const searchProduct = await getProductByNameService(body.name);
        const generatePrice = await generatePrices(body);
        if(searchProduct.length > 0){
            res.status(200);
            res.json({
                response: false,
                message: "Ese nombre de producto ya existe.",
            });
        }else{
            const product = await createProductService(body, generatePrice);
            res.status(201);
            res.json({
                response: true,
                message: "Producto creado.",
                data: product
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

export const updateProduct = async (req: Request, res: Response) => {
    try{

        const id = Number(req.params.id);
        const data: Products = req.body;

        const searchProduct = await getProductByNameService(data.name);
        if(searchProduct.length > 0 && searchProduct[0].name !== data.name && searchProduct[0].code !== data.code){
            res.status(200)
            .json({
                response: false,
                message: "Ese nombre de producto ya existe.",
            });
        }else{
            const product = await updateProductService(id,data);
            res.status(201)
            .json({
                response: true,
                message: "Producto actualizado con exito.",
                data: product
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

export const subtractQuantityProduct = async (id: number, quantity: number) => {
    try{
        const product = await subtractQuantityProductService(id, quantity)
        if(product.id > 0){
            return true;
        }else{
            return false
        }
    }catch(Error){
        return false;
    }
}

export const addQuantityProduct = async (id: number, quantity: number) => {
    try{
        const product = await addQuantityProductService(id, quantity)
        if(product.id > 0){
            return true;
        }else{
            return false
        }
    }catch(Error){
        return false;
    }
}

export const generatePrices = async (product: Products) => {
    const prices = [];
    const category: Categories[] = await getCategoryService(product.categoryId);
    const iva = generatePorIVA(Number(category[0].iva));
    const priceIva: number =  Number(product.arrival_price) + (Number(product.arrival_price) * iva);
    const rouded = roudedPrice(priceIva);
    prices.push(Math.round(priceIva), Math.round(rouded));
    return prices;
     
}

export const generatePorIVA = (iva: number): number => {
    const converIva =  Number(`0.${iva.toString()}`);
    return converIva;
}

export const productsByCaregory = async (categoryId: number) => {
    return await getProductsByCaregoryService(categoryId);
}

export const updateProductByCategory = async (id: number, data: any) => {
    return await updateProductByCategoryService(id,data);
}

export const updateProductAntiveSale = async (id: number, data: Products) => {
    return  await updateProductService(id,data);
}