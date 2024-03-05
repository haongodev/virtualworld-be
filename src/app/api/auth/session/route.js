import { AuthAdapter } from '@/src/library/authAdapter';
import authOptions from '@/src/library/authOptions';
import db from '@/src/library/prismadb';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { adminAuthAdapter } from '@/src/library/adminAuthAdapter';

export async function GET(request,response) {
    const store_id = checkUrlHasKeyId(request.url,'store_id');
    const isAdmin = checkUrlHasKeyId(request.url,'supreme');
    let responseCallback = null;
    if(isAdmin && !store_id){
        const adminSessionToken = request.cookies.get('next-auth.session-admin-token')?.value;
        if(!adminSessionToken){
            return NextResponse.json({ error: true, message: "Unauthorized" }, { status: 403 })
        }
        const adminAuth = adminAuthAdapter(db);
        const adminSessionData = await adminAuth.getAdminBySession(adminSessionToken);
        if(!adminSessionData){
            return NextResponse.json({ error: true, message: "Unauthorized" }, { status: 403 })
        }
        responseCallback = await authOptions(request,response).callbacks.sessionAdmin({
            session:adminSessionData,
            token:adminSessionData.sessionToken,
            user:adminSessionData.admin
        });
    }
    if(store_id && !isAdmin){
        const sessionToken = request.cookies.get('next-auth.session-token')?.value;
        if(!sessionToken){
            return NextResponse.json({ error: true, message: "Unauthorized" }, { status: 403 })
        }
        const auth = AuthAdapter(db);
        const sessionData = await auth.getSessionAndUser(sessionToken,store_id);
        if(!sessionData){
            // cookies().delete('next-auth.session-token');
            return NextResponse.json({ error: true, message: "Unauthorized" }, { status: 403 })
        }
        const callBackUrl = request.cookies.get('next-auth.callback-url')?.value;
        if(!callBackUrl || !checkUrlHasKeyId(callBackUrl,'store_id')){
            cookies().set('next-auth.callback-url', `${process.env.NEXTAUTH_URL}/${store_id}?store_id=${store_id}`)
        }
        responseCallback = await authOptions(request,response).callbacks.session({
            session:sessionData,
            token:sessionData.session.sessionToken,
            user:sessionData.user
        });
    }
    return NextResponse.json(responseCallback);
}

function checkUrlHasKeyId(url,key){
    const { searchParams } = new URL(url);
    return parseInt(searchParams.get(key));
}