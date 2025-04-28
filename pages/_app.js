import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import AdminLayout from "@/components/main/AdminLayout";
import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/globals.css";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { i18n } from "../i18n";
import ContactSidebar from "@/components/main/ContactSidebar";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { pathname, locale: routerLocale } = router;

  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
    });
  }, []);

  // Ensure locale is valid, fallback to default
  const locale = i18n.locales.includes(routerLocale) ? routerLocale : i18n.defaultLocale;

  // Load messages with fallback
  let messages = pageProps.messages;
  if (!messages) {
    try {
      messages = require(`../messages/${locale}.json`);
      console.log(`Loaded messages for locale ${locale}`);
    } catch (error) {
      console.error(`Failed to load messages for locale ${locale}:`, error);
      messages = require("../messages/en.json");
      console.log("Fell back to English messages");
    }
  }

  // Set direction for RTL (Arabic) or LTR (English, French)
  const direction = locale === "ar" ? "rtl" : "ltr";

  // Error boundary wrapper
  const renderContent = () => {
    try {
      if (pathname.startsWith("/admin")) {
        return (
          <SessionProvider session={pageProps.session}
          >
            <NextIntlClientProvider locale={locale} messages={messages}>
              <div dir={direction}>
                <AdminLayout>
                  <Component {...pageProps} />
                </AdminLayout>
              </div>
            </NextIntlClientProvider>
          </SessionProvider>
        );
      }

      return (
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div dir={direction} className="relative">
            <Header />
            <ContactSidebar/>
            <Component {...pageProps} />
            <Footer />
          </div>
        </NextIntlClientProvider>
      );
    } catch (error) {
      console.error("Rendering error in _app.js:", error);
      return <div className="container mx-auto p-4 text-red-600">An error occurred: {error.message}</div>;
    }
  };

  return renderContent();
}