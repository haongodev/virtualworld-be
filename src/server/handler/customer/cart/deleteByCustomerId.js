import db from "@/src/library/prismadb";

export const deleteByCustomerId = async (customer_id,prisma) => {
    return await (prisma ?? db).ShopCustomerCart.deleteMany({
        where: {
            customer_id
        },
    });
}