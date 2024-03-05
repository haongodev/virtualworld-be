import db from "@/src/library/prismadb";

export const storeOrUpdate = async (dataCart,prisma) => {
    return await (prisma ?? db).ShopCustomerCart.upsert({
        where: { id: dataCart.id },
        update:{...dataCart},
        create:{...dataCart}
    });
}