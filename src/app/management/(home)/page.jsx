import Dashboard from '@/src/backend/components/Sections/Board/@Dashboard'
import { DefaultLanguage } from '@/src/backend/constant';
import getAdminMessages from '@/src/intl/getAdminMessages';
import { createTranslator } from 'next-intl';
import { cookies } from 'next/headers';
import React from 'react'


export async function generateMetadata() {
  const locale = cookies().get('MANAGEMENT_LOCALE')?.value ?? DefaultLanguage;
  const messages = await getAdminMessages(locale);
  const t = createTranslator({locale, messages});
  return {
      title: t('Meta.title.index'),
  };
}

export default async function ManagerPage() {
  return (
    <Dashboard/>
  )
}
