"use client";

import { useRouter } from "next/navigation";
import { clearMockSession } from "@/lib/mock-auth";

export function LogoutButton({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        clearMockSession();
        router.push("/login");
        router.refresh();
      }}
      className={`rounded px-2 py-1.5 text-sm text-[var(--muted)] hover:bg-[var(--channel-hover)] hover:text-[var(--foreground)] ${className ?? "w-full text-left"}`}
    >
      로그아웃 (mock)
    </button>
  );
}
