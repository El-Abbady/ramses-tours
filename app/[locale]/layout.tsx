import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppFloatingButton from "../../components/WhatsAppFloatingButton";
import GTranslateWidget from "../../components/GTranslateWidget";
import "../globals.css";

export const metadata = {
  title: "Ramess Tours | Authentic Egypt Tours",
  description:
    "Tailor-made tours, luxury Nile cruises, and expert Egyptologist guides.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-slate-50 text-slate-900 flex flex-col min-h-screen antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
          <GTranslateWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
