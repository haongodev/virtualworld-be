import db from "@/src/library/prismadb";

export const storeOrUpdate = async (dataAddress,prisma) => {
    return await (prisma ?? db).ShopCustomerAddress.upsert({
        where: { id: dataAddress.id },
        update:{...dataAddress},
        create:{...dataAddress}
    });
}