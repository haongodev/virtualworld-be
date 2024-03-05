import Script from "next/script";
import React from "react";

export const generateSocialMetadata = (metaData) => {
    const {t,year,title,description,url,images} = metaData;
    return {
        alternates: {
            canonical: url ? `/${url}` : '/',
            languages: {
              'en-US': url ? `/en/${url}` : '/en',
              'vi-VN': url ? `/vi/${url}` : '/vi',
            },
        },
        openGraph: {
            title: title ? `${title} - Phimhottt` : t('VirtualWorld.title',{year}),
            description: description ? description : t('VirtualWorld.description'),
            url: url ? url : '/',
            type: 'website',
            images: images ? images : [`${process.env.NEXT_PUBLIC_URL}/logo/logo_light.svg`]
        },
        twitter: {
            site: '@phimhottt.com',
            title: title ? `${title} - Phimhottt` : t('VirtualWorld.title',{year}),
            description: description ? description : t('VirtualWorld.description'),
            images: images ? images : [`${process.env.NEXT_PUBLIC_URL}/logo/logo_light.svg`],
            creator:'@HN',
        },
    }
}

export const GoogleAnalytics = ({ ga_id }) => (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js? 
        id=${ga_id}`}
      ></Script>
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga_id}');
          `,
        }}
      ></Script>
    </>
  );