import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";




export const metadata: Metadata = {
  title: " هومینکس|Hominex",
  description:"معرفی و تحلیل محلات بجنورد؛ اطلاعات جمعیتی، کالبدی، عملکردی و کیفیت زندگی  ",
  icons: {
    icon: "/mahallat/icons/logo.png",  // مسیر آیکون
  },
};


const modam = localFont({
  src: [
    {
      path: "../../public/fonts/Modam/Modam-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Modam/Modam-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Modam/Modam-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-modam",
  display: "swap",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body  className={modam.className}>
       
        {children}
      </body>
    </html>
  );
}
