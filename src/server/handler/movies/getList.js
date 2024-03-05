import { cache } from "react";
import db from "../../../library/prismadb";

export const getList = cache(async (take,where,include,orderBy,prisma) => {
    const data = await (prisma ?? db).movies.findMany({
        where,
        include,
        orderBy,
        ...(take && { take }),
    });
    return data;
});