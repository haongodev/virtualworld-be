import { cache } from "react";
import db from "../../../library/prismadb";

export const getRandom = cache(async (take,prisma) => {
    const totalCount = await (prisma ?? db).movies.count();
    const skip = Math.floor(Math.random() * totalCount);
    const data = await (prisma ?? db).movies.findMany({
        ...(take && { take }),
        ...(skip && { skip }),
    });
    return data;
});