import Link from "next/link";

export function PublicHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--sidebar)] px-4 py-3">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-white no-underline hover:underline">
          AI TRIGGER
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm" aria-label="주요 페이지">
          <Link href="/pricing" className="text-[var(--muted)] hover:text-[var(--foreground)] no-underline hover:underline">
            가격
          </Link>
          <Link href="/login" className="text-[var(--muted)] hover:text-[var(--foreground)] no-underline hover:underline">
            로그인 (mock)
          </Link>
        </nav>
      </div>
    </header>
  );
}
