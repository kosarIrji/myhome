"use client";

import Link from "next/link";
import { useState } from "react";
import { Headphone, House, Plus, User } from "./ui/icons";

import Image from "next/image";
import logoWithe from "./../../public/images/logoWhite.png";

type ActionItem = {
  label: string;
  href?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: React.ComponentType<any>;
  onClick?: () => void;
  isButton?: boolean;
  className: string;
};

export default function MobileMenu() {
  const [userMenu, setUserMenu] = useState(false);
  //   const toggleUserMenu = () => setUserMenu((s) => !s);
  const closeUserMenu = () => setUserMenu(false);

  const bottomActions: ActionItem[] = [
    {
      label: "بازار املاک",
      href: "https://hominex.ir/estates",
      Icon: House,
      className: "",
    },
    {
      label: "آگهی",
      href: "https://hominex.ir/auth",
      Icon: Plus,
      className: "ml-10",
    },
    {
      label: "مشاوره",
      href: "https://hominex.ir/consultation",
      Icon: Headphone,
      className: "mr-5",
    },
    {
      label: "ورود", // ← متن "ورود"
      href: "https://hominex.ir/auth/login", // ← لینک به صفحه لاگین
      Icon: User, // ← آیکون کاربر
      className: "", // ← بدون کلاس اضافه
    },
  ];

  return (
    <div className="mx-auto left-0 right-0 z-20 fixed bottom-0 lg:hidden text-white grid grid-cols-4 gap-2 py-3 px-5 sm:mt-3 h-auto shadow-lg backdrop-blur-md bg-opacity-60 bg-(--sec)/90 shadow-black/50">
      {/* لوگوی وسط */}
      <Link
        href="https://hominex.ir"
        className="absolute -top-7 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="relative h-16 w-16 rounded-full bg-linear-to-br from-cyan-400 to-emerald-500 flex items-center justify-center shadow-[0_8px_25px_rgba(0,255,200,0.25)] border border-white/20 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_35px_rgba(0,255,200,0.35)]">
          <div className="absolute inset-0 rounded-full animate-pulse bg-cyan-400/20 blur-xl"></div>
          <Image
            src={logoWithe}
            alt="هومینکس"
            width={40}
            height={40}
            className="relative z-10 object-contain"
          />
        </div>
      </Link>

      {bottomActions.map(
        ({ label, href, Icon, onClick, isButton, className }, i) => {
          const iconElement = <Icon className="w-5 h-5" />; // همه آیکون‌ها با اندازه 20px
          if (isButton) {
            return (
              <button
                key={i}
                onClick={onClick}
                className="flex flex-col items-center gap-1 py-1"
              >
                {iconElement}
                <span className="text-xs opacity-80">{label}</span>
              </button>
            );
          } else if (href?.startsWith("http")) {
            return (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  "flex flex-col items-center justify-center gap-1 py-1 " +
                  className
                }
              >
                {iconElement}
                <span className="text-xs opacity-80">{label}</span>
              </a>
            );
          } else {
            return (
              <Link
                key={i}
                href={href!}
                className={
                  "flex flex-col items-center justify-center gap-1 py-1 " +
                  className
                }
              >
                {iconElement}
                <span className="text-xs opacity-80">{label}</span>
              </Link>
            );
          }
        }
      )}

      {userMenu && (
        <div className="absolute bottom-20 left-4 z-50 bg-(--sec)/90 backdrop-blur-xl rounded-xl shadow-lg text-sm p-3 flex flex-col gap-2 min-w-36 border border-white/10">
          <Link
            href="/dashboard"
            onClick={closeUserMenu}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition"
          >
            <span>داشبورد</span>
          </Link>

          <button
            onClick={closeUserMenu}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-red-400 transition"
          >
            <span>خروج</span>
          </button>
        </div>
      )}
    </div>
  );
}
