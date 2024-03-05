import Login from '@/src/backend/components/Sections/Authenticate/Login';
import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { adminAuthAdapter } from '@/src/library/adminAuthAdapter';
import db from '@/src/library/prismadb';

export async function generateMetadata({params}) {
  return {
      title: "Login"
  };
}

export default async function AuthenticatePage() {
  const cookieAuth = cookies().get('next-auth.session-admin-token');
  if(cookieAuth?.value){
    // check token exist
    const adminAuth = adminAuthAdapter(db);
    const admin = await adminAuth.getAdminBySession(cookieAuth.value);
    if(admin !== null && Object.keys(admin).length > 0){
      redirect('/management')
    }
  }
  return (
    <Login/>
  )
}
