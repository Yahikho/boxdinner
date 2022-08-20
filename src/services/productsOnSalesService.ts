import { ProductsOnSales, PrismaClient } from "@prisma/client";
import { Product } from "../models/productsModel";

const prisma: PrismaClient = new PrismaClient();


export const createProductsOnSales = async (saleId: bigint, product: Product): Promise<ProductsOnSales> => {
    return await prisma.productsOnSales.create({
        data: {
            productId : product.productId,
            saleId,
            quantity : product.quantity,
            total : product.total,
        }
    });
}

export const cancelProduct = async (id: bigint, active: boolean): Promise<ProductsOnSales>  => {
    return await prisma.productsOnSales.update({
        data: {
            active
        },
        where: {
            id
        }
    });
}

export const getProductsOnSales = async (saleId: bigint): Promise<ProductsOnSales[]> => {
    return prisma.productsOnSales.findMany({
        where: {
            saleId
        }
    });
}