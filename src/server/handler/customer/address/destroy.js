import db from "../../../../library/prismadb";

export const destroy = async (address_id,prisma) => {
    return await (prisma ?? db).ShopCustomerAddress.delete(
        { 
            where: { 
                id:address_id
            }
        }
    )
};