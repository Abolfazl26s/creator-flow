"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  exact?: boolean;
};

export default function NavLink({
  href,
  children,
  exact = false,
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`block rounded-lg px-3 py-2 text-sm transition ${
        isActive
          ? "bg-cyan-400 font-medium text-slate-950 shadow-sm shadow-cyan-400/20"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
