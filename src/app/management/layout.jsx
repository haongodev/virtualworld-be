import React from 'react';
import ThemeProvider from '@/src/backend/theme';
import ThemeColorPresets from '@/src/backend/theme/themecolorpresets';
import { SettingsProvider } from '@/src/backend/providers/SettingsProvider';
import Settings from '@/src/backend/components/Settings';
import RtlLayout from '@/src/backend/components/RtlLayout';
import { cookies } from 'next/headers'
import getAdminMessages from '@/src/intl/getAdminMessages';
import { createTranslator } from 'next-intl';
import { DefaultLanguage } from '@/src/backend/constant';
import NextIntlProvider from '@/src/providers/NextIntlProvider';

export async function generateMetadata({params}) {
    const locale = cookies().get('MANAGEMENT_LOCALE')?.value ?? DefaultLanguage;
    const messages = await getAdminMessages(locale);
    const t = createTranslator({locale, messages});
    return {
        title: {
          default: t('Meta.title.home'),
          template: `%s | PhimHot`,
        },
    };
}

export default async function ManagementLayout({ children }) {
    let settingCookie = {};
    cookies().getAll().map((cookie) => {
        if(['themeMode','themeColorPresets','themeLayout','themeDirection','themeStretch'].includes(cookie.name)){
            settingCookie[cookie.name] = (cookie.value === '"false"' || cookie.value === 'false') ? false : (cookie.value === '"true"' || cookie.value === 'true') ? true :cookie.value;
        }
    });
    const locale = cookies().get('MANAGEMENT_LOCALE')?.value ?? DefaultLanguage;
    const messages = await getAdminMessages(locale);
    return (
        <html>
            <body >
                <NextIntlProvider locale={locale} messages={messages}>
                    <SettingsProvider defaultSettings={settingCookie}>
                        <ThemeProvider>
                            <ThemeColorPresets>
                                <RtlLayout>
                                    <Settings />
                                    {children}
                                </RtlLayout>
                            </ThemeColorPresets>
                        </ThemeProvider>
                    </SettingsProvider>
                </NextIntlProvider>
            </body>
        </html>
    )
}
