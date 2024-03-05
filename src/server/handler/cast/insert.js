import db from "@/src/library/prismadb";

export const insert = async (data,prisma) => {
    return await (prisma ?? db).cast.createMany({data});
}