import db from "../../../library/prismadb";

export const getMeta = async (prisma) => {
    const pages = await (prisma ?? db).ShopPageStatic.findMany({
        select:{
            slug:true
        },
    })
    return pages;
};
