import db from "../../../library/prismadb";

export const getByCondition = async (take,skip,include,where,orderBy,prisma) => {
    // await new Promise(resolve => setTimeout(resolve,3000));

    const [total, data] = await (prisma ?? db).$transaction([
        (prisma ?? db).movies.count({where}),
        (prisma ?? db).movies.findMany({
            where,
            include,
            orderBy,
            ...(take && { take }),
            ...(skip && { skip }),
        })
        ]);
    return {
        total,
        data
    }
}