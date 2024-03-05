import db from "../../../library/prismadb";
import { cache } from "react";
import { responseStaticPage } from "./response/responseStaticPage";

export const getDetail = cache(async (slug,store_name,locale,prisma) => {
  const data = await (prisma ?? db).ShopPageStatic.findFirst({
    include: {
        description:{
            where:{
                lang:locale
            }
        }
    },
    where:{
        slug,
        store_name
    }
  });
  if(!data) return;
  return responseStaticPage(data);
});