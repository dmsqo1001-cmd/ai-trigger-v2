"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Alert } from "@/types/alert";
import { filterAlertsByChannel } from "@/lib/alerts";
import { GradeBadge } from "@/components/grade-badge";
import { LogoutButton } from "@/components/logout-button";

function formatKoTime(iso: string) {
  try {
    return new Date(iso).toLocaleString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function FeedAppShell({
  alerts,
  channels,
}: {
  alerts: Alert[];
  channels: string[];
}) {
  const [channel, setChannel] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(alerts[0]?.id ?? null);
  const [channelsOpen, setChannelsOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const filtered = useMemo(
    () => filterAlertsByChannel(alerts, channel),
    [alerts, channel],
  );

  const selected =
    filtered.find((a) => a.id === selectedId) ?? filtered[0] ?? null;

  function selectAlert(id: string) {
    setSelectedId(id);
    setSummaryOpen(true);
  }

  function pickChannel(next: string | null) {
    setChannel(next);
    setChannelsOpen(false);
    const nextList = filterAlertsByChannel(alerts, next);
    setSelectedId(nextList[0]?.id ?? null);
  }

  return (
    <div className="flex h-[100dvh] max-h-[100dvh] flex-col bg-[var(--background)] text-[var(--foreground)]">
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-[var(--border)] bg-[var(--sidebar)] px-3 lg:hidden">
        <button
          type="button"
          className="rounded p-2 text-[var(--foreground)] hover:bg-[var(--channel-hover)]"
          aria-expanded={channelsOpen}
          aria-controls="channel-drawer"
          onClick={() => {
            setChannelsOpen((v) => !v);
          }}
        >
          <span aria-hidden className="text-lg leading-none">
            ☰
          </span>
          <span className="sr-only">채널 목록</span>
        </button>
        <div className="min-w-0 flex-1 text-center text-sm font-semibold truncate">
          NEW TRIGGER
        </div>
        <button
          type="button"
          className="rounded p-2 text-[var(--foreground)] hover:bg-[var(--channel-hover)]"
          aria-expanded={summaryOpen}
          aria-controls="summary-drawer"
          onClick={() => setSummaryOpen((v) => !v)}
        >
          요약
        </button>
      </header>

      {channelsOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          aria-label="채널 패널 닫기"
          tabIndex={-1}
          onClick={() => setChannelsOpen(false)}
        />
      ) : null}

      {summaryOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          aria-label="요약 패널 닫기"
          tabIndex={-1}
          onClick={() => setSummaryOpen(false)}
        />
      ) : null}

      <div className="flex min-h-0 flex-1">
        {/* Left channels */}
        <aside
          id="channel-drawer"
          aria-label="채널"
          className={`z-40 flex w-56 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--sidebar)] max-lg:fixed max-lg:top-12 max-lg:bottom-0 max-lg:left-0 max-lg:w-60 max-lg:transition-transform lg:relative lg:top-auto ${
            channelsOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
          }`}
        >
          <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2 pt-4">
            <p className="px-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
              채널
            </p>
            <button
              type="button"
              onClick={() => pickChannel(null)}
              className={`rounded px-2 py-1.5 text-left text-sm hover:bg-[var(--channel-hover)] ${
                channel === null ? "bg-[var(--channel-hover)] text-white" : "text-[var(--muted)]"
              }`}
            >
              # 전체 보기
            </button>
            {channels.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => pickChannel(c)}
                className={`rounded px-2 py-1.5 text-left text-sm font-medium hover:bg-[var(--channel-hover)] ${
                  channel === c
                    ? "bg-[var(--channel-hover)] text-white"
                    : "text-[#949ba4]"
                }`}
              >
                # {c}
              </button>
            ))}
          </nav>
          <div className="border-t border-[var(--border)] p-2">
            <LogoutButton />
            <Link
              href="/admin"
              className="mt-1 block rounded px-2 py-1.5 text-sm text-[var(--muted)] hover:bg-[var(--channel-hover)] hover:text-[var(--foreground)] no-underline"
            >
              관리자 (mock)
            </Link>
          </div>
        </aside>

        {/* Center feed */}
        <main className="flex min-w-0 min-h-0 flex-1 flex-col bg-[var(--background)]">
          <header className="hidden h-14 shrink-0 items-center border-b border-[var(--border)] px-5 lg:flex">
            <h1 className="text-lg font-semibold tracking-tight">NEW TRIGGER</h1>
            <span className="ml-3 text-xs text-[var(--muted)]">
              읽기 전용 · 시스템 알림만 표시됩니다 (MVP mock)
            </span>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 sm:px-5">
            {filtered.length === 0 ? (
              <p className="py-16 text-center text-sm text-[var(--muted)]">
                이 채널에는 알림이 없습니다.
              </p>
            ) : (
              <ul className="flex flex-col gap-3" role="list">
                {filtered.map((alert) => {
                  const isSel = selected?.id === alert.id;
                  const triggerLabel = `${alert.newsGrade}${alert.newsGrade}${alert.newsGrade}`;
                  return (
                    <li key={alert.id}>
                      <div
                        role="article"
                        className={`flex gap-3 rounded-md border px-3 py-2 text-left transition-colors ${
                          isSel
                            ? "border-[var(--accent)] bg-[var(--sidebar)]"
                            : "border-transparent bg-[var(--sidebar)] hover:border-[var(--border)] hover:bg-[#34373e]"
                        }`}
                      >
                        <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
                          AI
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-[var(--foreground)]">
                              {triggerLabel}) NEW TRIGGER
                            </span>
                            <GradeBadge grade={alert.newsGrade} compact />
                            <span className="text-xs text-[var(--muted)]">
                              {formatKoTime(alert.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-[#dbdee1]">
                            <span className="mr-2 font-mono font-semibold text-white">
                              {alert.ticker}
                            </span>
                            {alert.latestNewsTitle}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => selectAlert(alert.id)}
                              className="rounded bg-[var(--accent)] px-3 py-1 text-xs font-medium text-white hover:brightness-110"
                            >
                              요약 패널
                            </button>
                            <Link
                              href={`/alert/${alert.id}`}
                              className="rounded border border-[var(--border)] px-3 py-1 text-xs text-[var(--foreground)] hover:bg-[var(--channel-hover)] no-underline"
                            >
                              상세 페이지
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </main>

        {/* Right summary */}
        <aside
          id="summary-drawer"
          aria-label="선택 알림 요약"
          className={`z-40 flex w-72 shrink-0 flex-col border-l border-[var(--border)] bg-[var(--sidebar)] max-lg:fixed max-lg:top-12 max-lg:bottom-0 max-lg:right-0 max-lg:w-[min(100vw,20rem)] max-lg:border-l max-lg:border-t max-lg:border-[var(--border)] max-lg:transition-transform lg:relative lg:top-auto ${
            summaryOpen ? "max-lg:translate-x-0" : "max-lg:translate-x-full"
          }`}
        >
          <div className="flex h-14 shrink-0 items-center border-b border-[var(--border)] px-4">
            <h2 className="text-sm font-semibold">요약 패널</h2>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            {selected ? (
              <div className="space-y-3 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-lg font-bold">{selected.ticker}</span>
                  <GradeBadge grade={selected.newsGrade} compact />
                </div>
                <p className="text-[var(--muted)] leading-relaxed">{selected.aiOneLine}</p>
                <dl className="space-y-2 text-xs text-[#dbdee1]">
                  <div className="flex justify-between gap-2">
                    <dt className="text-[var(--muted)]">가격</dt>
                    <dd>{selected.price}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-[var(--muted)]">유동주식수</dt>
                    <dd>{selected.floatShares}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-[var(--muted)]">뉴스 강도</dt>
                    <dd>
                      <GradeBadge grade={selected.newsGrade} compact />
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-[var(--muted)]">SEC 리스크</dt>
                    <dd>
                      <GradeBadge grade={selected.secRiskGrade} compact />
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-[var(--muted)]">숏 가능성</dt>
                    <dd>
                      <GradeBadge grade={selected.shortSqueezeGrade} compact />
                    </dd>
                  </div>
                </dl>
                <Link
                  href={`/alert/${selected.id}`}
                  className="inline-block rounded bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-white hover:brightness-110 no-underline"
                >
                  전체 카드 보기
                </Link>
              </div>
            ) : (
              <p className="text-sm text-[var(--muted)]">
                피드에서 알림을 선택하면 요약이 표시됩니다.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
