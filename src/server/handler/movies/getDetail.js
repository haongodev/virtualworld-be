import { cache } from "react";
import db from "../../../library/prismadb";

export const getDetail = cache(async (slug,include,prisma) => {
  const data = await (prisma ?? db).movies.findFirst({
    where:{
        slug,
    },
    include
  });
  return data;
});