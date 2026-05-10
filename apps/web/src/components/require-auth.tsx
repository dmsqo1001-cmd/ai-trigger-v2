"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { readMockLoggedIn } from "@/lib/mock-auth";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (readMockLoggedIn()) return;
    const next = pathname && pathname !== "/login" ? pathname : "/feed";
    router.replace(`/login?next=${encodeURIComponent(next)}`);
  }, [ready, router, pathname]);

  if (!ready) {
    return (
      <div
        role="status"
        className="flex flex-1 items-center justify-center text-sm text-[var(--muted)]"
      >
        초기화 중…
      </div>
    );
  }

  if (!readMockLoggedIn()) {
    return (
      <div
        role="status"
        className="flex flex-1 items-center justify-center text-sm text-[var(--muted)]"
      >
        로그인이 필요합니다. 이동 중…
      </div>
    );
  }

  return <>{children}</>;
}
