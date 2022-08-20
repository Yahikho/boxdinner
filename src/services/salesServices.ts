import { Sales, PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const getSales = async (): Promise<Sales[]> => {
    return await prisma.sales.findMany();
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
            active
        }
    });
}

export const cancelSale = async (id: bigint, active: boolean): Promise<Sales>  => {
    return await prisma.sales.update({
        data: {
            active
        },
        where: {
            id
        }
    });
}