import uniq from "lodash/uniq";
import db from "../../../library/prismadb";
import { cache } from "react";

export const getAvatarName = cache(async (store_list,locale,prisma) => {
    const data = await (prisma ?? db).shops.findMany({
        select:{
            logo:true,
            domain:true,
            description:{
                select:{
                    title:true
                },
                where:{
                    lang:locale
                }
            }
        },
        where: {
            domain:{
                in:uniq(store_list)
            },
            status: 1,
            active: 1,
        },
    })
    if(!data) return;
    return data;
});