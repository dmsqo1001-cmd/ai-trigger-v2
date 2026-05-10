import Link from "next/link";
import { RequireAuth } from "@/components/require-auth";
import { LogoutButton } from "@/components/logout-button";
import { mockAlerts } from "@/data/mockAlerts";

function summarize() {
  const byNewsGrade: Record<string, number> = {};
  const byChannel: Record<string, number> = {};
  for (const a of mockAlerts) {
    byNewsGrade[a.newsGrade] = (byNewsGrade[a.newsGrade] ?? 0) + 1;
    byChannel[a.channel] = (byChannel[a.channel] ?? 0) + 1;
  }
  return { byNewsGrade, byChannel };
}

export default function AdminPage() {
  const { byNewsGrade, byChannel } = summarize();

  return (
    <RequireAuth>
      <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <header className="border-b border-[var(--border)] bg-[var(--sidebar)] px-4 py-4">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4">
            <h1 className="text-xl font-semibold text-white">관리자 (mock)</h1>
            <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs text-amber-200">
              쓰기/삭제 없음 — 읽기 전용 대시보드
            </span>
            <div className="ml-auto flex items-center gap-3">
              <Link
                href="/feed"
                className="text-sm text-[#00a8fc] no-underline hover:underline"
              >
                피드로
              </Link>
              <LogoutButton className="w-auto whitespace-nowrap text-[#00a8fc] hover:text-white" />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
          <section>
            <h2 className="text-sm font-semibold text-[var(--muted)]">
              피드에 등록된 mock 알림 수
            </h2>
            <p className="mt-2 text-4xl font-bold text-white">{mockAlerts.length}</p>
          </section>
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar)] p-5">
              <h3 className="text-base font-semibold text-white">뉴스 등급 분포</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#dbdee1]">
                {Object.entries(byNewsGrade)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([r, n]) => (
                    <li key={r} className="flex justify-between gap-2">
                      <span className="text-[var(--muted)]">{r}</span>
                      <span className="font-mono">{n}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar)] p-5">
              <h3 className="text-base font-semibold text-white">채널 분포</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#dbdee1]">
                {Object.entries(byChannel)
                  .sort(([, a], [, b]) => b - a)
                  .map(([c, n]) => (
                    <li key={c} className="flex justify-between gap-2">
                      <span className="text-[var(--muted)]">#{c}</span>
                      <span className="font-mono">{n}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
          <section className="rounded-lg border border-[var(--border)] bg-[var(--sidebar-deep)] p-5">
            <h3 className="text-base font-semibold text-white">최근 mock 알림 (최대 5건)</h3>
            <ol className="mt-4 space-y-2 text-sm text-[#dbdee1]" role="list">
              {[...mockAlerts]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                )
                .slice(0, 5)
                .map((a) => (
                  <li key={a.id} className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-2 last:border-0">
                    <Link
                      href={`/alert/${a.id}`}
                      className="font-mono font-semibold text-white no-underline hover:underline"
                    >
                      {a.ticker}
                    </Link>
                    <span className="text-[var(--muted)]">{a.latestNewsTitle}</span>
                  </li>
                ))}
            </ol>
          </section>
        </main>
      </div>
    </RequireAuth>
  );
}
