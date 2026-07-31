"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import GoogleIcon from "./icons/GoogleIcon";

export default function AccountMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  if (status === "loading") {
    return <div className="h-9 w-9 rounded-full border border-line bg-panel/80 animate-pulse" />;
  }

  if (status === "authenticated" && session.user) {
    return (
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Account menu"
          aria-expanded={open}
          className="h-9 w-9 rounded-full overflow-hidden border border-line hover:border-accent transition-colors"
        >
          {session.user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={session.user.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-panel text-ink text-sm font-medium">
              {session.user.name?.[0] ?? session.user.email?.[0] ?? "?"}
            </div>
          )}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-56 rounded-lg border border-line bg-panel shadow-lg shadow-black/20 p-3">
            <div className="text-sm text-ink truncate">{session.user.name}</div>
            <div className="text-xs text-muted truncate">{session.user.email}</div>
            <button
              type="button"
              onClick={() => signOut()}
              className="mt-3 flex w-full items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs text-muted hover:text-danger hover:border-danger/40 transition-colors"
            >
              <LogOut size={13} /> Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="flex items-center gap-2 rounded-full border border-line bg-panel/80 backdrop-blur px-3.5 py-2 text-xs font-medium text-ink hover:border-accent transition-colors"
    >
      <GoogleIcon size={14} />
      Sign in
    </button>
  );
}
