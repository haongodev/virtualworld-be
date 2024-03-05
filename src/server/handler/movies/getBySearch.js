import { cache } from "react";
import db from "../../../library/prismadb";

export const getBySearch = cache(async (params,prisma) => {
    let {s,c,take,skip,withTotal,orderBy,include} = params;
    take = parseInt(take); 
    skip = parseInt(skip); 
    const where = {}
    if(s !== undefined && s !== "undefined"){
        const searchValues = s.split(" ");
        if (searchValues.length === 0) return [];
        where['OR'] = [
            {
                slug:s,
            },
            {
                AND: searchValues.flatMap((val) => [
                    {
                        origin_name: {
                            contains: val,
                        },
                    },
                ]),
            },
            {
                AND: searchValues.flatMap((val) => [
                    {
                        name: {
                            contains: val,
                        },
                    },
                ]),
            },
            {
                description: {
                    contains: s,
                },
            },
        ]
    }
    if(c > 0){
        c = parseInt(c);
        where['id_category'] = c;
    }
    if(withTotal === 'true' || withTotal === true){
        const [total, data] = await (prisma ?? db).$transaction([
            (prisma ?? db).movies.count({where}),
            (prisma ?? db).movies.findMany({
                where,
                include,
                orderBy,
                ...(take && { take }),
            })
        ]);
        return {
            total,
            data
        }
    }else{
        const data = await (prisma ?? db).movies.findMany({
            where,
            include,
            orderBy,
            ...(take && { take }),
            ...(skip && { skip }),
        })
        return data
    }
});