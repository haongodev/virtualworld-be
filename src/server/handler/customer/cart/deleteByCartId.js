import db from "@/src/library/prismadb";

export const deleteByCartId = async (id,prisma) => {
    await (prisma ?? db).ShopCustomerCart.deleteMany({
        where: {
            id
        },
    });
}