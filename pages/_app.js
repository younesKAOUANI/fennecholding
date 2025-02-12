import { SessionProvider } from "next-auth/react";
import AdminLayout from "@/components/main/AdminLayout";
import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out'
    });
  }, []);

  const { pathname } = useRouter();
  console.log(pathname);

  if (pathname.startsWith("/admin")) {
    return (
      <SessionProvider session={pageProps.session}>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </SessionProvider>
    );
  }
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
