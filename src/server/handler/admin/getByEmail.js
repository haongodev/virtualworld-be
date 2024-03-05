import db from "../../../library/prismadb";

export const getByEmail = async (email,prisma) => {
    const admin = await (prisma ?? db).Admin.findFirst({
        where:{
            email,
        }
    });
    return admin;
};