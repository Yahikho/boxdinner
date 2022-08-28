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
        data :{
            name: data.name,
            active: data.active,
            iva: data.iva,
            create_at: new Date(),
            update_at: new Date()
        }
    });
}

export const updateCategory = async (id: number, data : Categories): Promise<Categories> => {
    return await prisma.categories.update({
        where: {
            id
        },
        data :{
            name: data.name,
            active: data.active,
            iva: data.iva,
            update_at: new Date()
        }
    });
}

export const getCategoryByName = async (name: string): Promise<Categories[]> => {
    return await prisma.categories.findMany({
        where : {
            name
        }
    });
}

