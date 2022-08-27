import { Sales, PrismaClient } from "@prisma/client";
import { SalesByCategory } from "../models/productsModel"

const prisma: PrismaClient = new PrismaClient();

export const getSalesDay = async (initial: string): Promise<Sales[]> => {
    return await prisma.$queryRaw`select * from sales s where create_at > ${initial}`;
}

export const getSalesBetween = async (initial: string, finish: string): Promise<Sales[]> => {
    return await prisma.$queryRaw`select * from sales s where create_at between ${initial} and ${finish}`;
}

export const getSale = async (id: bigint): Promise<Sales[]> => {
    return await prisma.sales.findMany({
        where: {
            id
        }
    });
}

export const createSale = async (active: boolean): Promise<Sales> => {
    return await prisma.sales.create({
        data: {
            active,
            payment: 0
        }
    });
}

export const cancelSale = async (id: number, active: boolean): Promise<Sales>  => {
    return await prisma.sales.update({
        data: {
            active
        },
        where: {
            id
        }
    });
}

export const updatePayment = async (id: bigint, payment: number, total: number): Promise<Sales>  => {
    return await prisma.sales.update({
        data: {
            payment,
            total
        },
        where: {
            id,
        }
    });
}

export const salesByCategory = async (initial: string): Promise<SalesByCategory[]> => {
    return await prisma.$queryRaw`SELECT c.name, sum(pos.total) as total from products_on_sales pos 
    inner join sales s on pos.saleId = s.id 
    inner join products p on pos.productId = p.id
    inner join categories c on p.categoryId = c.id
    where s.create_at > ${initial}
    GROUP by c.name `;
}

export const salesByCategoryDateBetween = async (initial: string, finish: string): Promise<SalesByCategory[]> => {
    return await prisma.$queryRaw`SELECT c.name, sum(pos.total) as total from products_on_sales pos 
    inner join sales s on pos.saleId = s.id 
    inner join products p on pos.productId = p.id
    inner join categories c on p.categoryId = c.id
    where s.create_at BETWEEN  ${initial} and ${finish}
    GROUP by c.name `;
}