import Link from "next/link";
import { PublicHeader } from "@/components/public-header";

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PublicHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
        <h1 className="text-3xl font-bold text-white">가격 (UI mock)</h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
          최종 서비스는 무료 플랜 없이 유료 구독만 제공합니다. MVP 1에서는 Toss 결제·
          청구 시스템을 연결하지 않습니다.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-[var(--border)] bg-[var(--sidebar)] p-6">
            <h2 className="text-lg font-semibold text-white">Pro — 월간</h2>
            <p className="mt-2 text-3xl font-bold text-white">
              ₩99,000 <span className="text-sm font-normal text-[var(--muted)]">/월 (예시)</span>
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-[#dbdee1]">
              <li>당일 급등 후보 알림 피드 (읽기 전용)</li>
              <li>이벤트 감지·SEC 리스크·지속성 판단 요약</li>
              <li>모바일 반응형 피드 UI</li>
            </ul>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 no-underline"
            >
              mock 로그인으로 체험
            </Link>
          </article>
          <article className="rounded-xl border border-[var(--border)] bg-[var(--sidebar-deep)] p-6">
            <h2 className="text-lg font-semibold text-white">Teams — 분기</h2>
            <p className="mt-2 text-3xl font-bold text-white">
              ₩249,000 <span className="text-sm font-normal text-[var(--muted)]">/분기 (예시)</span>
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-[#dbdee1]">
              <li>여러 기기에서 동시 모니터링 (향후)</li>
              <li>우선 큐레이션 보기 (향후)</li>
              <li>관리자 대시보드 확장 (향후)</li>
            </ul>
            <p className="mt-6 text-xs text-[var(--muted)]">
              결제 연동 전까지는 데모 데이터로만 동작합니다.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}
