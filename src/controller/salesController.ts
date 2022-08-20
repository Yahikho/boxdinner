import { Products, ProductsOnSales, Sales } from "@prisma/client";
import { Request, Response } from "express";
import { 
    createSale as createSaleService,
    cancelSale as cancelSaleService,
} from "../services/salesServices";
import { getProductsOnSales } from "../controller/productsOnSalesController"
import { updateProductByCategory,
    getProduct as getProductService
} from "../services/productsService";

export const cancelSale = async (req:Request, res:Response) => {
    try{
        const id = BigInt(req.params.id);
        const active = req.body.active;
        const sale = await cancelSaleService(id, active);
        const productsOnSales = await getProductsOnSales(sale.id) 
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
                    message: "Venta anulado con exito.",
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
        Promise.all(productsOnSales.map(async (element) =>{
            const product = await getProductService(Number(element.id));
            const newQuantuty = product[0].quantity_unit + element.quantity;
            const productUp = await updateProductByCategory(Number(element.id), {quantity_unit : newQuantuty});
            productsUp.push(productUp);
        }));
    }else{
        Promise.all(productsOnSales.map(async (element) =>{
            const product = await getProductService(Number(element.id));
            const newQuantuty = product[0].quantity_unit - element.quantity;
            const productUp = await updateProductByCategory(Number(element.id), {quantity_unit : newQuantuty});
            productsUp.push(productUp);
        }));
    }

    return productsUp;
    
}