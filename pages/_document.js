import Document, { Html, Head, Main, NextScript } from 'next/document';
import { i18n } from '../i18n';
import HomeMetaData from '@/components/Metadata/HomeMetaData';

export default class MyDocument extends Document {
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const direction = locale === 'ar' ? 'rtl' : 'ltr';

    return (
      <Html lang={locale} dir={direction}>
        <Head>
          <link rel="icon" type="image/png" href="/public/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/public/favicon.svg" />
          <link rel="shortcut icon" href="/public/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-title" content="Fennec Holding" />
          <link rel="manifest" href="/public/site.webmanifest" />
          <HomeMetaData />
          {i18n.locales.map((loc) => (
            <link
              key={loc}
              rel="alternate"
              hrefLang={loc}
              href={`/${loc}${this.props.__NEXT_DATA__.page}`}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
} 