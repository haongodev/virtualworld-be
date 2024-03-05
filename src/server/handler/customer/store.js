import db from "@/src/library/prismadb";

export const store = async (data,prisma) => {
    return await (prisma ?? db).ShopCustomer.create({data});
}