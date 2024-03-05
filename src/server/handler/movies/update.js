import db from "@/src/library/prismadb";

export const update = async (id,data,prisma) => {
    return await (prisma ?? db).movies.update({
        where:{
            id
        },
        data
    });
}