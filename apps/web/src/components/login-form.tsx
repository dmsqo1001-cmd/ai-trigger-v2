"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { writeMockLoggedIn } from "@/lib/mock-auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/feed";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function goMember() {
    writeMockLoggedIn();
    const path = next.startsWith("/") ? next : "/feed";
    router.push(path);
    router.refresh();
  }

  function goDemoFeed() {
    writeMockLoggedIn();
    router.push("/feed");
    router.refresh();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("이메일과 비밀번호를 입력하세요. (MVP에서는 검증만 표시)");
      return;
    }
    goMember();
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--sidebar)] p-6 shadow-lg">
      <h1 className="text-xl font-semibold text-[var(--foreground)]">로그인 (mock)</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        실제 인증·Google 로그인·Supabase는 연결하지 않습니다. 데모 로그인으로 피드를
        확인할 수 있습니다.
      </p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-[var(--muted)]">
            이메일
          </label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border border-[var(--border)] bg-[var(--sidebar-deep)] px-3 py-2 text-sm text-[var(--foreground)]"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-xs font-medium text-[var(--muted)]">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded border border-[var(--border)] bg-[var(--sidebar-deep)] px-3 py-2 text-sm text-[var(--foreground)]"
          />
        </div>
        {error ? (
          <p className="text-sm text-red-300" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          className="w-full rounded bg-[var(--accent)] py-2 text-sm font-semibold text-white hover:brightness-110"
        >
          로그인 (mock)
        </button>
      </form>
      <button
        type="button"
        className="mt-4 w-full rounded border border-[var(--border)] py-2 text-sm text-[var(--foreground)] hover:bg-[var(--channel-hover)]"
        onClick={goDemoFeed}
      >
        데모 로그인
      </button>
    </div>
  );
}
