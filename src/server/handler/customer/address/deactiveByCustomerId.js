import db from "../../../../library/prismadb";

export const deactiveByCustomerId = async (customer_id,prisma) => {
    const address = await (prisma ?? db).ShopCustomerAddress.findFirst({
        where:{
            customer_id,
            active:true
        }
    });
    if(address){
        return await (prisma ?? db).ShopCustomerAddress.update(
            { 
                where: { 
                    id:address.id
                }, 
                data:{ 
                    active:false 
                } 
            }
        )
    }
};