import Link from "next/link";
import type { Alert } from "@/types/alert";
import { GradeBadge } from "@/components/grade-badge";

function formatKoTime(iso: string) {
  try {
    return new Date(iso).toLocaleString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      month: "numeric",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function TriggerCard({
  alert,
  showDetailLink,
}: {
  alert: Alert;
  showDetailLink?: boolean;
}) {
  const triggerLabel = `${alert.newsGrade}${alert.newsGrade}${alert.newsGrade}`;
  const title = `${triggerLabel}) NEW TRIGGER`;

  return (
    <article
      className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-sm"
      aria-labelledby={`trigger-${alert.id}-title`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <GradeBadge grade={alert.newsGrade} />
        <h2 id={`trigger-${alert.id}-title`} className="font-semibold text-[var(--foreground)]">
          {title}
        </h2>
        <span className="text-xs text-[var(--muted)]">{formatKoTime(alert.createdAt)}</span>
        {showDetailLink ? (
          <Link
            href={`/alert/${alert.id}`}
            className="ml-auto text-sm text-[#00a8fc] hover:underline no-underline"
          >
            상세
          </Link>
        ) : null}
      </div>

      <dl className="grid gap-2 text-sm leading-relaxed text-[var(--foreground)]">
        <div className="flex gap-2">
          <dt className="w-28 shrink-0 text-[var(--muted)]">티커</dt>
          <dd className="font-mono font-medium">{alert.ticker}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-28 shrink-0 text-[var(--muted)]">가격</dt>
          <dd>{alert.price}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-28 shrink-0 text-[var(--muted)]">유동주식수</dt>
          <dd>{alert.floatShares}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-28 shrink-0 text-[var(--muted)]">감시 사유</dt>
          <dd>{alert.watchlistReasons.join(" / ")}</dd>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
          <dt className="w-28 shrink-0 text-[var(--muted)]">최신뉴스</dt>
          <dd className="min-w-0 flex-1">
            {alert.latestNewsTitle}{" "}
            <GradeBadge grade={alert.newsGrade} compact />
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-28 shrink-0 text-[var(--muted)]">뉴스 유형</dt>
          <dd>{alert.newsType}</dd>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <dt className="w-28 shrink-0 text-[var(--muted)]">SEC 리스크</dt>
          <dd className="flex flex-wrap items-center gap-2">
            {alert.secRiskForm} <GradeBadge grade={alert.secRiskGrade} compact />
          </dd>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <dt className="w-28 shrink-0 text-[var(--muted)]">숏스퀴즈 가능성</dt>
          <dd>
            <GradeBadge grade={alert.shortSqueezeGrade} compact />
          </dd>
        </div>
      </dl>

      <p className="mt-4 border-t border-[var(--border)] pt-3 text-sm text-[var(--foreground)]">
        <span className="font-semibold text-[var(--muted)]">
          TRIGGER AI 한줄 평:{" "}
        </span>
        {alert.aiOneLine}
      </p>
    </article>
  );
}
