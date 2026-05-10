"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Alert } from "@/types/alert";
import { GradeBadge } from "@/components/grade-badge";
import { LogoutButton } from "@/components/logout-button";

function formatKoTime(iso: string) {
  try {
    return new Date(iso).toLocaleString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function triggerLabelByGrade(grade: Alert["newsGrade"]) {
  if (grade === "S") return "SSS";
  if (grade === "A") return "AAA";
  if (grade === "B") return "BBB";
  if (grade === "C") return "CCC";
  return "FFF";
}

const gradeMenus: Alert["newsGrade"][] = ["S", "A", "B", "C", "F"];
type SelectedChannel = "REALTIME" | Alert["newsGrade"];

function TriggerWordmark() {
  return (
    <span className="font-bold tracking-tight">
      <span className="text-white">AI </span>
      <span className="text-[#34c37a]">TRIGGER</span>
    </span>
  );
}

export function FeedAppShell({
  alerts,
}: {
  alerts: Alert[];
}) {
  const [selectedChannel, setSelectedChannel] =
    useState<SelectedChannel>("REALTIME");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [channelsOpen, setChannelsOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const displayedAlerts = useMemo(
    () =>
      (selectedChannel === "REALTIME"
        ? alerts
        : alerts.filter((a) => a.newsGrade === selectedChannel)
      ).sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
    [alerts, selectedChannel],
  );

  const gradeCounts = useMemo(
    () =>
      gradeMenus.reduce<Record<Alert["newsGrade"], number>>(
        (acc, g) => ({ ...acc, [g]: alerts.filter((a) => a.newsGrade === g).length }),
        { S: 0, A: 0, B: 0, C: 0, F: 0 },
      ),
    [alerts],
  );

  useEffect(() => {
    setSelectedId((prev) =>
      displayedAlerts.some((a) => a.id === prev)
        ? prev
        : displayedAlerts.at(-1)?.id ?? null,
    );
  }, [displayedAlerts]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  }, [selectedChannel, displayedAlerts.length]);

  const selected =
    displayedAlerts.find((a) => a.id === selectedId) ??
    displayedAlerts.at(-1) ??
    null;

  function selectAlert(id: string) {
    setSelectedId(id);
    setSummaryOpen(true);
  }

  function pickFilter(next: SelectedChannel) {
    setSelectedChannel(next);
    setChannelsOpen(false);
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
          <Link href="/feed" className="no-underline">
            <TriggerWordmark />
          </Link>
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
          aria-label="등급 채널"
          className={`z-40 flex w-56 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--sidebar)] max-lg:fixed max-lg:top-12 max-lg:bottom-0 max-lg:left-0 max-lg:w-60 max-lg:transition-transform lg:relative lg:top-auto ${
            channelsOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
          }`}
        >
          <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2 pt-4">
            <p className="px-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
              등급 채널
            </p>
            <button
              type="button"
              onClick={() => pickFilter("REALTIME")}
              className={`mb-1 flex items-center justify-between rounded px-3 py-2 text-left text-sm font-medium transition hover:bg-[var(--channel-hover)] ${
                selectedChannel === "REALTIME"
                  ? "bg-[var(--channel-hover)] text-white"
                  : "text-[#c9ced6]"
              }`}
            >
              <span># 실시간 채널</span>
              <span
                className={`rounded px-1.5 py-0.5 text-xs ${
                  selectedChannel === "REALTIME"
                    ? "bg-black/30 text-white"
                    : "bg-black/20 text-[#c9ced6]"
                }`}
              >
                {alerts.length}
              </span>
            </button>
            {gradeMenus.map((grade) => (
              <button
                key={grade}
                type="button"
                onClick={() => pickFilter(grade)}
                className={`flex items-center justify-between rounded px-3 py-2 text-left text-sm font-medium transition hover:bg-[var(--channel-hover)] ${
                  selectedChannel === grade
                    ? "bg-[var(--channel-hover)] text-white"
                    : grade === "F"
                      ? "text-red-300"
                      : "text-[#c9ced6]"
                }`}
              >
                <span># {grade} 등급</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-xs ${
                    selectedChannel === grade
                      ? "bg-black/30 text-white"
                      : "bg-black/20 text-[#c9ced6]"
                  }`}
                >
                  {gradeCounts[grade]}
                </span>
              </button>
            ))}
            <p className="mt-3 px-3 text-xs leading-relaxed text-[var(--muted)]">
              F 등급은 리스크 우세 또는 부정적 요소가 확인된 이벤트를 우선 표시합니다.
            </p>
          </nav>
          <div className="border-t border-[var(--border)] p-2">
            <LogoutButton />
          </div>
        </aside>

        {/* Center feed */}
        <main className="flex min-w-0 min-h-0 flex-1 flex-col bg-[var(--background)]">
          <header className="hidden h-14 shrink-0 items-center border-b border-[var(--border)] px-5 lg:flex">
            <Link href="/feed" className="rounded px-1 py-0.5 text-lg font-semibold tracking-tight no-underline">
              <TriggerWordmark />
            </Link>
            <span className="ml-3 text-xs text-[var(--muted)]">
              읽기 전용 실시간 피드
            </span>
          </header>
          <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-5 sm:py-5">
            {displayedAlerts.length === 0 ? (
              <p className="py-16 text-center text-sm text-[var(--muted)]">
                선택한 등급에 해당하는 NEW TRIGGER 메시지가 없습니다.
              </p>
            ) : (
              <ul className="flex flex-col gap-4" role="list">
                {displayedAlerts.map((alert) => {
                  const isSel = selected?.id === alert.id;
                  const triggerLabel = triggerLabelByGrade(alert.newsGrade);
                  return (
                    <li key={alert.id}>
                      <button
                        type="button"
                        role="article"
                        onClick={() => selectAlert(alert.id)}
                        className={`w-full rounded-lg border px-4 py-4 text-left transition-colors ${
                          isSel
                            ? "border-[#34c37a] bg-[var(--sidebar)]"
                            : "border-[var(--border)] bg-[var(--sidebar)] hover:bg-[#2c313a]"
                        }`}
                      >
                        <div className="min-w-0 space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold">
                              <TriggerWordmark />
                            </span>
                            <span className="text-xs text-[var(--muted)]">{formatKoTime(alert.createdAt)}</span>
                          </div>
                          <p className="text-sm font-semibold text-[#d4af37]">
                            {triggerLabel}) NEW TRIGGER
                          </p>
                          <p className="text-lg font-semibold text-white">
                            {alert.ticker} · {alert.price}
                          </p>
                          <div className="space-y-1 text-sm text-[#dbdee1]">
                            <p>NEWS : {alert.latestNewsTitle} [ {alert.newsGrade} ]</p>
                            <p>RISK : {alert.secRiskForm.toLowerCase()} [ {alert.secRiskGrade} ]</p>
                          </div>
                          <div className="rounded-md border border-[var(--border)] bg-[#1a202c] p-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                              <TriggerWordmark />
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-[#d7dbe2]">{alert.aiOneLine}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded border border-[var(--border)] bg-[var(--sidebar-deep)] px-3 py-1 text-xs text-white">
                              핵심 요약
                            </span>
                            <Link
                              href={`/alert/${alert.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="rounded border border-[var(--border)] px-3 py-1 text-xs text-[var(--foreground)] hover:bg-[var(--channel-hover)] no-underline"
                            >
                              상세 분석
                            </Link>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            <div ref={endRef} />
          </div>
          <div className="border-t border-[var(--border)] bg-[var(--sidebar)] px-3 py-3 sm:px-5">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar-deep)] p-3">
              <textarea
                disabled
                rows={2}
                value="AI TRIGGER 전용 읽기 채널입니다. 사용자는 메시지를 입력할 수 없습니다."
                className="w-full resize-none rounded border border-[var(--border)] bg-[#111723] px-3 py-2 text-sm text-[var(--muted)]"
              />
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="text-xs text-[var(--muted)]">
                  이 채널은 AI TRIGGER가 실시간 정보를 제공하는 읽기 전용 피드입니다.
                </p>
                <button
                  type="button"
                  disabled
                  className="rounded bg-[#2f3542] px-3 py-1.5 text-xs font-semibold text-[#9aa1ab]"
                >
                  전송
                </button>
              </div>
            </div>
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
                <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar-deep)] p-3">
                  <p className="text-xs text-[var(--muted)]">티커</p>
                  <p className="mt-1 font-mono text-xl font-bold text-white">{selected.ticker}</p>
                </div>
                <dl className="space-y-2 text-xs text-[#dbdee1]">
                  <div className="flex justify-between gap-2">
                    <dt className="text-[var(--muted)]">현재가</dt>
                    <dd>{selected.price}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-[var(--muted)]">뉴스 등급</dt>
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
                </dl>
                <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar-deep)] p-3">
                  <p className="text-xs text-[var(--muted)]">TRIGGER AI 한줄평</p>
                  <p className="mt-2 leading-relaxed text-[#d7dbe2]">{selected.aiOneLine}</p>
                </div>
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
