import db from "../../../../library/prismadb";
import { responseLocals } from "../response/locals";

export const getLocals = async (params,prisma) => {
    const {type,code} = params;
    let data = [];
    if(!type) return [];
    switch (type) {
        case "provinces":
            data = await (prisma ?? db).VnProvinces.findMany();
            break;
        case "districts":
            data = await (prisma ?? db).VnDistricts.findMany({
                where:{
                    province_code:parseInt(code)
                }
            });
            break;
        default:
            data = await (prisma ?? db).VnWards.findMany({
                where:{
                    district_code:parseInt(code)
                }
            });
            break;
    }
    return responseLocals(data);
};