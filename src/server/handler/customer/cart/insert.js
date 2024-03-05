import db from "@/src/library/prismadb";

export const insert = async (dataCart,prisma) => {
    return await (prisma ?? db).ShopCustomerCart.createMany({data:dataCart});
}