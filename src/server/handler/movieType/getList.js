import db from "../../../library/prismadb";

export const getList = async (withTotal,take,skip,type_id,include,prisma) => {
    const where = {
        id_type:type_id
    };
    if(type_id && Array.isArray(type_id)){
        where.id_type = {
            in:type_id
        };
    }
    if(withTotal === 'true' || withTotal === true){
        const [total, data] = await (prisma ?? db).$transaction([
            (prisma ?? db).movieType.count({where}),
            (prisma ?? db).movieType.findMany({
                where,
                include,
                orderBy:{
                    movie:{
                        publish_date:'desc'
                    }
                },
                ...(take && { take }),
                ...(skip && { skip }),
            })
          ]);
        return {
            total,
            data
        }
    }else{
        const data = await (prisma ?? db).movieType.findMany({
            where,
            include,
            orderBy:{
                movie:{
                    publish_date:'desc'
                }
            },
            ...(take && { take }),
            ...(skip && { skip }),
        })
        return {
            data
        }
    }
}