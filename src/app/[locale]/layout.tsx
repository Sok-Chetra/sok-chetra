import type { Metadata } from "next";
import { Inter, Montserrat, KoHo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CookiesProvider } from "next-client-cookies/server";
import { Layout } from "@/components/layout";
import { NextIntlClientProvider, useMessages } from "next-intl";

const inter = Inter({ subsets: ["latin"] });
const montserat = Montserrat({
   subsets: ["latin"],
   variable: "--font-montseret"
});
const koho = KoHo({
   subsets: ["latin"],
   weight: ["700"],
   variable: "--font-koho"
});


export const metadata: Metadata = {
   title: "Sok Chetra",
   description: "Generated by create next app",
};

//function to generate the routes for all the locales
export async function generateStaticParams() {
   return ['en', 'kh'].map((locale) => ({ locale }))
 }

 export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
   children,
   params: { locale }
}: {
   children: React.ReactNode;
   params: { locale: string };
}) {
   const messages = await useMessages();

   return (

      <html lang={locale} className="scroll-smooth antialiased" suppressHydrationWarning>
         <body className={cn("bg-gray-50 dark:bg-slate-900", inter.className, montserat.variable, koho.variable)}>
            <NextIntlClientProvider locale={locale} messages={messages}>
               <CookiesProvider>
                  <ThemeProvider
                     attribute="class"
                     defaultTheme="system"
                     enableSystem
                     disableTransitionOnChange
                  >
                     <Layout>
                        {children}
                     </Layout>
                  </ThemeProvider>
               </CookiesProvider>
            </NextIntlClientProvider>
         </body>
      </html>

   );
}

