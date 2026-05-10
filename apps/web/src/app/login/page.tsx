import Link from "next/link";
import { Suspense } from "react";
import { PublicHeader } from "@/components/public-header";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PublicHeader />
      <main className="flex flex-1 flex-col justify-center px-4 py-10">
        <Suspense fallback={<p className="text-center text-[var(--muted)]">불러오는 중…</p>}>
          <LoginForm />
        </Suspense>
        <p className="mx-auto mt-6 max-w-md text-center text-xs text-[var(--muted)]">
          <Link href="/" className="text-[#00a8fc] no-underline hover:underline">
            홈
          </Link>
          에서 제공 범위를 다시 확인할 수 있습니다.
        </p>
      </main>
    </div>
  );
}
