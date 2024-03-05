import db from "../../../library/prismadb";

export const getList = async (take,skip,id_country,include,orderBy,prisma) => {
    const where = {
        id_country
    };
    if(id_country && Array.isArray(id_country)){
        where.id_country = {
            in:id_country
        };
    }
    const [total, data] = await (prisma ?? db).$transaction([
        (prisma ?? db).movieCountries.count({where}),
        (prisma ?? db).movieCountries.findMany({
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