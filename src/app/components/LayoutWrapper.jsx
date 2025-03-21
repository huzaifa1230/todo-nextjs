"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "./Header";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const protectedRoutes = ["/", "/edit"];

  const shouldShowHeader =
    session &&
    protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    );

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowHeader && <Header />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
