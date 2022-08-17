import { Categories, PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const getCategories = async (): Promise<Categories[]> => {
    return await prisma.categories.findMany();
}

export const getCategory = async (id: number): Promise<Categories[]> => {
    return await prisma.categories.findMany({
        where : {
            id
        }
    })
}

export const createCategory = async (data :Categories): Promise<Categories> => {
    return await prisma.categories.create({
        data
    });
}

export const updateCategory = async (id: number, data : Categories): Promise<Categories> => {
    return await prisma.categories.update({
        where: {
            id
        },
        data
    });
}

export const getCategoryByName = async (name: string): Promise<Categories[]> => {
    return await prisma.categories.findMany({
        where : {
            name
        }
    });
}