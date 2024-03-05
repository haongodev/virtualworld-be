import { currentDateTimeToString } from "./helper";

export function adminAuthAdapter(p) {
    return {
        // async createUser(data) {
        //     const full_name = data.name?.split(' ') || [];
        //     const first_name = full_name[0] || '';
        //     const last_name = full_name[1] || '';
        //     const email = data.email;
        //     const avatar = data.image;
        //     const dataInsert = {
        //         first_name,
        //         last_name,
        //         email,
        //         avatar,
        //         store_id:store_id,
        //         store_name
        //     }
        //     return p.ShopCustomer.create({data:dataInsert})
        // },
        // async getUser(id){
        //     return p.ShopCustomer.findFirst({ where: { id,store_id } });
        // },
    //     async getUserByEmail(email){
    //         return p.ShopCustomer.findFirst({ where: { email,store_id } });
    //     },
    //     async getUserByAccount(provider_providerAccountId) {
    //         const provider_providerAccountId_store_id = provider_providerAccountId;
    //         provider_providerAccountId_store_id['store_id'] = store_id;
    //         const account = await p.ShopAccount.findUnique({
    //             where: {
    //                 provider_providerAccountId_store_id,
    //             },
    //             select: { customer: true },
    //         })
    //         return account?.customer ?? null
    //     },
    //     updateUser: ({ id, ...data }) => p.ShopCustomer.update({ where: { id }, data }),
    //     deleteUser: (id) => p.ShopCustomer.delete({ where: { id } }),
    //     async linkAccount(data){
    //         data.customer_id = data.userId;
    //         data.store_id = store_id;
    //         delete data.userId;
    //         return p.ShopAccount.create({ data })
    //     },
    //     unlinkAccount: (provider_providerAccountId) =>
    //         p.ShopAccount.delete({
    //             where: { provider_providerAccountId },
    //         }),
        async getAdminBySession(sessionToken) {
            const admin = await p.ShopSession.findUnique({
                include: { 
                    admin: true,
                },
                where: {
                    sessionToken,
                    admin_id: {
                        not: null,
                    },
                },
            })
            if (!admin) return null;
            return admin;
        },
        async deleteSession(admin_id){
            return p.ShopSession.deleteMany({ 
                where: { 
                    admin_id
                }
            })
        },
        async createSession(data){
            let newSes = {
                admin_id:data.userId,
                sessionToken:data.sessionToken,
                expires:data.expires,
            };
            return p.ShopSession.create({ data:newSes })
        },
    //     updateSession: (data) =>
    //         p.ShopSession.update({ where: { sessionToken: data.sessionToken }, data }),
    //     deleteSession: (sessionToken) =>
    //         p.ShopSession.delete({ where: { sessionToken } }),
    //     async createVerificationToken(data) {
    //         const verificationToken = await p.ShopVerificationToken.create({ data })
    //         if (verificationToken.id) delete verificationToken.id
    //         return verificationToken
    //     },
    //     async useVerificationToken(identifier_token) {
    //         try {
    //             const verificationToken = await p.ShopVerificationToken.delete({
    //                 where: { identifier_token },
    //             })
    //             if (verificationToken.id) delete verificationToken.id
    //             return verificationToken
    //         } catch (error) {
    //             // If token already used/deleted, just return null
    //             // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
    //             if ((error).code === "P2025")
    //                 return null
    //             throw error
    //         }
    //     },
    }
}
