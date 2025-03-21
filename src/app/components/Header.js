"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-black text-white shadow-2xl">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/todos" className="text-xl font-bold">
          Todo App
        </Link>

        {session && (
          <div className="flex items-center gap-4">
            <span>Hello, {session.user.name || session.user.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="rounded-md bg-white px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
