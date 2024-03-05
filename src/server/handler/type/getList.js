import db from "../../../library/prismadb";

export const getList = async (prisma) => {
    const data = await (prisma ?? db).type.findMany();
    return data
}