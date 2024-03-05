import db from "../../../library/prismadb";
import { cache } from "react";

export const getIdByName = cache(async (store_name,prisma) => {
  const data = await (prisma ?? db).shops.findUnique({
    where: {
      domain: store_name,
    },
    select:{
        id:true
    }
  });
  return data ? data.id : null;
});