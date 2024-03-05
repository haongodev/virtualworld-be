import db from "../../../library/prismadb";

export const getByEmail = async (email,store_id,prisma) => {
    const customer = await (prisma ?? db).ShopCustomer.findFirst({
        where:{
            email,
            store_id
        }
    });
    return customer;
};