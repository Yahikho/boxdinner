import { Sales } from "@prisma/client";
import { Request, Response } from "express";
import { 
    createSale as createSaleService,
    cancelSale as cancelSaleService,
} from "../services/salesServices";
import { getProductsOnSales } from "../controller/productsOnSalesController"

export const cancelSale = async (req:Request, res:Response) => {
    try{
        const id = BigInt(req.params.id);
        const active = req.body.active;
        const sale = await cancelSaleService(id, active);
        if(sale.id > 0){
            if(sale.active){
                const productsOnSales = await getProductsOnSales(id) 
                console.log(productsOnSales);
                res.status(201)
                .json({
                    response: true,
                    message: "Venta activa con exito."
                });
            }else{
                res.status(201)
                .json({
                    response: true,
                    message: "Venta anulado con exito."
                });
            }
            
        }else{
            res.status(200);
            res.json({
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