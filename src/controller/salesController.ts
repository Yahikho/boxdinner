import {Products, ProductsOnSales, Sales } from "@prisma/client";
import { Request, Response } from "express";
import { SalesByCategory } from "../models/productsModel"
import { 
    createSale as createSaleService,
    cancelSale as cancelSaleService,
    getSalesDay as getSalesDaySerivice,
    getSalesBetween as getSalesBetweenService,
    salesByCategory as salesByCategoryService
} from "../services/salesServices";
import { getProductsOnSales } from "../controller/productsOnSalesController"
import { updateProductBySale as updateProductBySaleService,
    getProduct as getProductService
} from "../services/productsService";

export const getSalesDay = async (_req:Request, res:Response) => {
    try{
        const dateNow = generateDateNow();
        const sales: Sales[] = await getSalesDaySerivice(dateNow);
        if(sales.length > 0){
            res.status(200)
            .json({
                response: true,
                message: "true",
                data: toJson(sales)
            });
        }else{
            res.status(200)
            .json({
                response: false,
                message: "No hay datos.",
            });
        }
    }catch(Error){
            res.status(400)
            .json({
                response: false,
                message: "Ocurrio un error.",
            });
    }
}

export const salesByCategoryDay = async(_req:Request, res:Response) => {
    try{
        const dateNow = generateDateNow();
        const salesByCategory: SalesByCategory[] = await salesByCategoryService(dateNow);
        if(salesByCategory.length > 0){
            res.status(200)
            .json({
                response: true,
                message: "true",
                data: salesByCategory
            });
        }else{
            res.status(200)
            .json({
                response: false,
                message: "No hay datos.",
            });
        }
    }catch(Error){
            res.status(400)
            .json({
                response: false,
                message: "Ocurrio un error.",
            });
    }
}

export const getSalesBetween = async (req:Request, res:Response) => {
    try{
        const initial = req.body.initial;
        const finish = req.body.finish;
        const sales: Sales[] = await getSalesBetweenService(initial, finish);
        if(sales.length > 0){
            res.status(200)
            .json({
                response: true,
                message: "true",
                data: toJson(sales)
            });
        }else{
            res.status(200)
            .json({
                response: false,
                message: "No hay datos.",
            });
        }
    }catch(Error){
            res.status(400)
            .json({
                response: false,
                message: "Ocurrio un error.",
            });
    }
}

export const cancelSale = async (req:Request, res:Response) => {
    try{
        const id = req.params.id;
        const active = req.body.active;
        const sale = await cancelSaleService(Number(id), active);
        const productsOnSales = await getProductsOnSales(Number(sale.id), true) 
        if(sale.id > 0){
            if(sale.active){
                const products = await updatePrices(productsOnSales, true);
                res.status(201)
                .json({
                    response: true,
                    message: "Venta activa con exito.",
                    data: products
                });
            }else{
                const products = await updatePrices(productsOnSales, false);
                res.status(201)
                .json({
                    response: true,
                    message: "Venta anulada con exito.",
                    data: products
                });
            }
        }else{
            res.status(200)
            .json({
                response: false,
                message: "Por alguna razon no se puede anular la factura.",
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

export const createSale = async () => {
    const sale: Sales = await createSaleService(true);
    return sale;
}

async function updatePrices(productsOnSales: ProductsOnSales[], active: boolean){
    const productsUp: Products[] = [];
    if(active){
        await Promise.all(productsOnSales.map(async (element) =>{
            const product = await getProductService(Number(element.productId));
            const quantity_unit = product[0].quantity_unit;
            const newQuantuty: number = quantity_unit + element.quantity;
            const productUp = await updateProductBySaleService(Number(element.productId), newQuantuty);
            productsUp.push(productUp);
        }));
    }else{
        await Promise.all(productsOnSales.map(async (element) =>{
            const product = await getProductService(Number(element.productId));
            const quantity_unit = product[0].quantity_unit 
            const newQuantuty: number =  quantity_unit - element.quantity;
            const productUp = await updateProductBySaleService(Number(element.productId), newQuantuty);
            productsUp.push(productUp);
        }));
    }

    return productsUp;
    
}

export const  toJson = (data: any) => {
    return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
        .replace(/"(-?\d+)n"/g, (_, a) => a);
}

const generateDateNow = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const newD = today.toLocaleDateString().split("/")
    return `${newD[2]}/${newD[0]}/${newD[1]}`;
}

