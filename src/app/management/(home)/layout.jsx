import DashboardLayout from '@/src/backend/layouts/dashboard/DashboardLayout';
import { CollapseDrawerProvider } from '@/src/backend/providers/CollapseDrawerProvider';
import ManagerProvider from '@/src/backend/providers/ManagerProvider';
import { adminAuthAdapter } from '@/src/library/adminAuthAdapter';
import db from '@/src/library/prismadb';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ReactQueryProvider from '@/src/providers/ReactQueryProvider';
import React from 'react'
import MuiXProvider from '@/src/backend/providers/MuiXProvider';


export default async function ManagerLayout({ children }) {
  const cookieAuth = cookies().get('next-auth.session-admin-token');
  if(cookieAuth?.value){
    // check token exist
    const adminAuth = adminAuthAdapter(db);
    const admin = await adminAuth.getAdminBySession(cookieAuth.value);
    if(admin === null){
      redirect('/management/authenticate')
    }
  }else{
    redirect('/management/authenticate')
  }
  return (  
    <ManagerProvider>
      <ReactQueryProvider>
        <CollapseDrawerProvider>
          <MuiXProvider>
            <DashboardLayout > {children} </DashboardLayout>
          </MuiXProvider>
        </CollapseDrawerProvider>
      </ReactQueryProvider>
    </ManagerProvider>
  )
}
