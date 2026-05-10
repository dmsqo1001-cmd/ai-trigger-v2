import Link from "next/link";
import { PublicHeader } from "@/components/public-header";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-12">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            MVP mock
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            미국 증시 당일 급등 후보를 한곳에서 읽기 전용으로 모니터링합니다.
          </h1>
          <p className="max-w-2xl text-lg text-[#dbdee1]">
            AI TRIGGER는 감시 목록·이벤트 감지·SEC 리스크·지속성 판단·수급 민감도
            정보를 Discord 스타일 피드로 제공합니다. 본 MVP는 mock 데이터만 사용하며
            실제 시세·뉴스 API는 연결하지 않습니다.
          </p>
          <p className="max-w-2xl text-sm text-[var(--muted)]">
            서비스는 투자 권유나 특정 가격 지시, 손익 확정을 약속하는 표현을 제공하지
            않습니다. 사용자는 메시지를 작성할 수 없습니다.
          </p>
        </section>
        <section className="flex flex-wrap gap-3">
          <Link
            href="/pricing"
            className="rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:brightness-110 no-underline"
          >
            요금 보기
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--channel-hover)] no-underline"
          >
            로그인 (mock) 후 피드
          </Link>
        </section>
        <section className="grid gap-4 border-t border-[var(--border)] pt-10 sm:grid-cols-2">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar)] p-5">
            <h2 className="text-base font-semibold text-white">회원 전용 피드</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              결제·Toss 연동 전까지 mock 로그인으로 NEW TRIGGER 채널형 피드를 확인할
              수 있습니다.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar)] p-5">
            <h2 className="text-base font-semibold text-white">리스크 중심 정보</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              뉴스 강도·리스크 등급·SEC 양식 등을 카드 형식으로 정리해 관찰에 필요한
              맥락을 빠르게 파악합니다.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
