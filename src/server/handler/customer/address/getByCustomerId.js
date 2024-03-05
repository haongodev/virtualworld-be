import db from "../../../../library/prismadb";
import { responseAddresses } from "../response/address";

export const getByCustomerId = async (customer_id,prisma) => {
    const address = await (prisma ?? db).ShopCustomerAddress.findMany({
        where:{
            customer_id
        }
    });
    if(!address){
        return null
    }
    return responseAddresses(address);
};