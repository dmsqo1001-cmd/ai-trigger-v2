import Link from "next/link";
import { notFound } from "next/navigation";
import { RequireAuth } from "@/components/require-auth";
import { TriggerCard } from "@/components/trigger-card";
import { getAlertById } from "@/lib/alerts";

export default async function AlertDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const alert = getAlertById(id);
  if (!alert) notFound();

  return (
    <RequireAuth>
      <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <header className="border-b border-[var(--border)] bg-[var(--sidebar)] px-4 py-3">
          <div className="mx-auto flex max-w-3xl items-center gap-4">
            <Link
              href="/feed"
              className="text-sm text-[#00a8fc] no-underline hover:underline"
            >
              ← 피드로 돌아가기
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-8">
          <TriggerCard alert={alert} showDetailLink={false} />
        </main>
      </div>
    </RequireAuth>
  );
}
