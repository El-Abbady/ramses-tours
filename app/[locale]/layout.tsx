import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/server";
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

  const supabase = await createClient();
  const { data: rawTours } = await supabase
    .from("tours")
    .select("id, slug, title_en, city, category")
    .order("created_at", { ascending: false });

  const navTours = (rawTours || []).map((t) => ({
    id: t.id,
    slug: t.slug,
    title: t.title_en,
    city: t.city,
    category: t.category,
  }));

  return (
    <html lang={locale}>
      <body className="bg-slate-50 text-slate-900 flex flex-col min-h-screen antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar tours={navTours} />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
          <GTranslateWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
