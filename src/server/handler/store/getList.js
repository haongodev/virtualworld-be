import db from "../../../library/prismadb";
import { cache } from "react";
import { responseStores } from "./response";

export const getList = cache(async (include,skip,take,prisma) => {
    const [total, data] = await (prisma ?? db).$transaction([
      (prisma ?? db).shops.count(),
      (prisma ?? db).shops.findMany({
        include: include,
        where: {
          status: 1,
          active: 1,
        },
        ...(skip && { skip }),
        ...(take && { take }),
      }),
    ]);
    if(!data) return;
    return {
      total,
      data:responseStores(data)
    }
});