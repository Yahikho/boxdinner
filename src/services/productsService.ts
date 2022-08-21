import { Products, PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const getProducts = async (): Promise<Products[]> => {
    return await prisma.products.findMany();
}

export const getProduct = async (id: number): Promise<Products[]> => {
    return await prisma.products.findMany({
        where:{
            id
        }
    });
}

export const createProduct = async (data: Products, prices: any): Promise<Products> => {
    return await prisma.products.create({
        data: {
            code: data.code,
            name: data.name,
            quantity_unit: data.quantity_unit,
            arrival_price: data.arrival_price,
            price_iva: prices[0],
            price_sale: prices[1],
            categoryId: data.categoryId,
        }
    });
}

export const updateProduct = async (id: number, data: Products, prices: any): Promise<Products> => {
    return await prisma.products.update({
        where: {
            id
        },
        data: {
            code: data.code,
            name: data.name,
            quantity_unit: data.quantity_unit,
            arrival_price: data.arrival_price,
            price_iva: prices[0],
            price_sale: prices[1],
            categoryId: data.categoryId,
            active : data.active
        }
    });
}

export const getProductByName = async (name: string): Promise<Products[]> => {
    return await prisma.products.findMany({
        where:{
            name
        }
    });
}

export const subtractQuantityProduct = async (id: number, quantity: number): Promise<Products> => {
    return await prisma.products.update({
        data: {
            quantity_unit: quantity
        },
        where: {
            id
        }
    });
}

export const addQuantityProduct = async (id: number, quantity: number): Promise<Products> => {
    return await prisma.products.update({
        data: {
            quantity_unit: quantity
        },
        where: {
            id
        }
    });
}

export const getProductsByCaregory = async (categoryId: number):Promise<Products[]> =>{
    return await prisma.products.findMany({
        where: {
            categoryId
        }
    });
}

export const updateProductByCategory = async (id: number, prices: any): Promise<Products> => {
    return await prisma.products.update({
        where: {
            id
        },
        data: {
            price_iva: prices[0],
            price_sale: prices[1],
        }
    });
}

export const updateProductBySale = async (id: number, quantity: number): Promise<Products> => {
    return await prisma.products.update({
        where: {
            id
        },
        data:{
            quantity_unit: quantity
        }
    });
}



