import { AuthAdapter } from '@/src/library/authAdapter';
import authOptions from '@/src/library/authOptions'
import db from '@/src/library/prismadb';
import NextAuth from 'next-auth'
import { DefaultLanguage } from '@/src/constant';

const handler = (req,res) => {
    let optionAuth = authOptions(req,res);
    if(req.method === "GET"){
        if(req.cookies.get('next-auth.callback-url')?.value){
            const current_locale = req.cookies.get('NEXT_LOCALE')?.value || DefaultLanguage;
            const url = new URL(req.cookies.get('next-auth.callback-url')?.value);
            const store_name = url.pathname.replace(/[^\w\s]/gi, '');
            const store_id = url.searchParams.get('store_id');
            optionAuth.adapter = AuthAdapter(db,parseInt(store_id),store_name,current_locale);
        }
    }
    return NextAuth(req,res,optionAuth);
}

export { handler as GET, handler as POST }