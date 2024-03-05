import { cache } from "react";
import db from "../../../library/prismadb";
import { responseCustomer } from "./response";

export const getById = cache(async (id,prisma) => {
    const customer = await (prisma ?? db).ShopCustomer.findUnique({
        where:{
            id
        }
    });
    if(!customer){
        return null
    }
    return responseCustomer(customer);
});