"use client";
import {
  Codesandbox,
  History,
  Home,
  Layers3,
  LayoutGrid,
  Settings,
  User,
  User2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Sidebar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>loading...</p>;
  }
  if (status === "unauthenticated") {
    router.push("/login");
    return;
  }
  const pathname = usePathname();
  const adminLinks = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "User Profile",
      icon: User2,
      href: "/dashboard/profile",
    },
    {
      title: "Vendor Profile",
      icon: User2,
      href: "/dashboard/vendor-profile",
    },
    {
      title: "Manage Products",
      icon: Layers3,
      href: "/dashboard/products",
    },
    {
      title: "Manage Categories",
      icon: LayoutGrid,
      href: "/dashboard/categories",
    },
    {
      title: "Manage Users",
      icon: User,
      href: "/dashboard/users",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];
  const vendorLinks = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Manage Products",
      icon: Layers3,
      href: "/dashboard/products",
    },
    {
      title: "Vendor Profile",
      icon: User2,
      href: "/dashboard/vendor-profile",
    },
  ];
  const userLinks = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Profile",
      icon: User2,
      href: "/dashboard/profile",
    },
  ];

  const navLinks =
    session?.user?.role === "ADMIN"
      ? adminLinks
      : session?.user?.role === "VENDOR"
      ? vendorLinks
      : userLinks;

  return (
    <div className="w-[200px] min-h-screen bg-slate-800 text-slate-100  p-4">
      <Link href="#" className="flex items-center">
        <Codesandbox className="mr-2 h-6 sm:h-9 text-purple-600" />
        {/* <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Desishub
        </span>
      </Link>
      <div className="my-6 flex flex-col space-y-2">
        {navLinks.map((link, i) => {
          const Icon = link.icon;
          return (
            <Link
              key={i}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-slate-100 flex items-center bg-purple-600 px-4 py-2 rounded-md mb-2"
                  : "text-slate-100 flex items-center py-2"
              }
            >
              <Icon className="w-4 h-4 mr-2 " />
              <span>{link.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
