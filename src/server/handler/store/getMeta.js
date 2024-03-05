import db from "../../../library/prismadb";

export const getMeta = async (prisma) => {
    const stores = await (prisma ?? db).shops.findMany({
        select:{
            domain:true
        },
    })
    return stores;
};
