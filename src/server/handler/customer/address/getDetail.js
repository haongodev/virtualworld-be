
import db from "@/src/library/prismadb";
import { cache } from "react";
import { responseAddress } from "../response/address";

export const getDetail = cache(async (address_id,prisma) => {
    const address = await (prisma ?? db).ShopCustomerAddress.findUnique({
        where:{
            id:address_id
        }
    });
    if(!address){
        return null
    }
    return responseAddress(address);
});
