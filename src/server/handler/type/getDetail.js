import { cache } from "react";
import db from "../../../library/prismadb";

export const getDetail = cache(async (type,include,prisma) => {
  const data = await (prisma ?? db).type.findFirst({
    where:{
        slug:type,
    },
    include
  });
  return data;
});