import { Request, Response } from "express";
import { Product } from "../models/productsModel";
import { Products, ProductsOnSales } from "@prisma/client";
import { 
    createProductsOnSales as createProductsOnSalesService,
    cancelProduct as cancelProductService,
    getProductsOnSales as getProductsOnSalesService
} from "../services/productsOnSalesService";
import { getProduct as getProductService } from "../services/productsService";
import { createSale as createSaleController} from "../controller/salesController";
import { subtractQuantityProduct, addQuantityProduct } from "../controller/productsController";
import { updatePayment as  updatePaymentService } from "../services/salesServices";

export const createProductsOnSales = async (req:Request, res:Response) => {
    try{
        const payment = req.body.payment;
        const total = req.body.total;
        const sale = await createSaleController();
        await updatePaymentService(sale.id, payment, total);
        if(sale.id > 0){
            const products: Product[] = req.body.products
            const sales = await createProductsOneToOneSales(sale.id, products);
            if(sales.length > 0){
                res.status(201)
                .json({
                    response: true,
                    message: "Venta creada.",
                    data: toJson(sales)
                });
            }else{

            }
            
        }else{
            res.status(500)
            .json({
                response : false,
                message : `No se logro crear la venta.`
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

export const cancelProduct = async (req:Request, res:Response) => {
    try{
        const productOnSaleId = BigInt(req.params.id);
        const active: boolean = req.body.active;
        const productOnSale = await cancelProductService(productOnSaleId, active);
        let addQuantity: boolean = false;
        if(productOnSale.active){
            addQuantity = await subtractQuantityByProduct(productOnSale.productId || 0, productOnSale.quantity);
        }else{
            addQuantity = await addQuantityByProduct(productOnSale.productId || 0, productOnSale.quantity);
        }
        if(addQuantity){
            if(productOnSale.id > 0){
                if(productOnSale.active){
                    res.status(201)
                    .json({
                        response: true,
                        message: "Producto cancelado.",
                        data: toJson(productOnSale)
                    });
                }else{
                    res.status(201)
                    .json({
                        response: true,
                        message: "Producto Activado de nuevo.",
                        data: toJson(productOnSale)
                    });
                }
            }else {
                res.status(500)
                .json({
                    response : false,
                    message : `El roducto no se pudo anular.`
                });
            }
        }else{
            res.status(500)
            .json({
                response : false,
                message : `La cantidad no se pudo adicionar y el producto no se cancelo.`
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

export const getProductsOnSales = async (saleIs: number, active: boolean) => {
    return await getProductsOnSalesService(saleIs, active);
}

async function createProductsOneToOneSales(id: bigint, products: Product[]){
    const productsOnSales: ProductsOnSales[] = [];
    await Promise.all(products.map(async (element) => {
        const priceUnit = element.price_sale
        const total = priceUnit * element.quantity;
        const productSale: ProductsOnSales =  await createProductsOnSalesService(id, element, Number(priceUnit), total)
        const updateQuantityProduct: boolean = await subtractQuantityByProduct(element.productId, element.quantity);
        if(updateQuantityProduct){
            productsOnSales.push(productSale);
        }
    }));
    return productsOnSales;
}

async function subtractQuantityByProduct(idProduct: number, productQuantity: number){
    const product: Products[] = await getProductService(idProduct);
    const subtractQuantity = product[0].quantity_unit - productQuantity;
    const rta: boolean = await subtractQuantityProduct(idProduct, subtractQuantity);
    return rta;
}

async function addQuantityByProduct(idProduct: number, productQuantity: number){
    const product: Products[] = await getProductService(idProduct);
    const addtractQuantity = product[0].quantity_unit + productQuantity;
    const rta: boolean = await addQuantityProduct(idProduct, addtractQuantity);
    return rta;
}

export const  toJson = (data: any) => {
    return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
        .replace(/"(-?\d+)n"/g, (_, a) => a);
}
