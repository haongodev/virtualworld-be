import db from "../../../library/prismadb";
import { cache } from "react";
import { responseStore } from "./response";

export const getDetail = cache(async (include,shop,prisma) => {
  let where = {};
  if(!Number.isNaN(parseInt(shop))){
    where['id'] = parseInt(shop);
  }else{
    where['domain'] = shop;
  }
  const data = await (prisma ?? db).shops.findUnique({
    include: include,
    where
  });
  if(!data) return;
  return responseStore(data);
});