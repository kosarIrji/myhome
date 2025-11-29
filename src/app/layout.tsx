import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: " هومینکس|Hominex",
  description:"معرفی و تحلیل محلات بجنورد؛ اطلاعات جمعیتی، کالبدی، عملکردی و کیفیت زندگی  ",
  icons: {
    icon: "/icons/logo.png",  // مسیر آیکون
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body >
       
        {children}
      </body>
    </html>
  );
}
