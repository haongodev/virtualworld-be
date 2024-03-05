import db from "../../../library/prismadb";

export const getList = async (prisma) => {
    return await (prisma ?? db).advers.findMany();
}