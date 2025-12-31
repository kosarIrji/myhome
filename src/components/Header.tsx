"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


import { User } from "./../components/ui/icons";
import Button from "./../components/ui/buttonMain";
import logo from "./../../public/images/logoMain.png"


const items = [
    { title: "بازار املاک", href: "https://hominex.ir/estates" },
    { title: "مشاوره خرید", href: "https://hominex.ir/consultation" },
    { title: "معرفی محلات", href: "https://hominow.ir/mahallat" },
    { title: "هومینکس مگ", href: "https://hominex.ir/mag" },
];

function Header() {
    const pathname = usePathname();


    const hideSection =
        pathname.startsWith("/dashboard") || pathname.startsWith("/auth") || pathname.startsWith('/builders')

    if (hideSection) return null;


    return (
        <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 container mt-0 md:block hidden sm:mt-6">
            <div className="navbar backdrop-blur-sm bg-(--sec)/70 flex items-center justify-between px-2 sm:px-10 py-4 sm:rounded-2xl rounded-none shadow-2xl">
                {/* Logo */}
                <Link
                    href={"https://hominex.ir/"}
                    className="flex flex-row gap-2 items-center justify-center hover:text-(--prim) transition"
                >
                    <Image
                        src={logo}
                        alt={""}
                        width={60}
                        height={60}
                    />
                    <span className="text font-bold text-white">هومینکس</span>
                </Link>

                {/* nav */}
                <div>
                    <ul className="hidden lg:flex">
                        {items.map((item, index) => (
                            <li key={index}>
                                <Button
                                    title={item.title}
                                    as="link"
                                    href={item.href}
                                    variant="ghost"
                                />
                            </li>
                        ))}
                    </ul>
                </div>

             
                    <Button title="ورود / ثبت نام" as="link" href="https://hominex.ir/auth/login" icon={<User />} variant="ghost" />
             
                      
              
            </div>
        </header>
    );
}

export default Header;