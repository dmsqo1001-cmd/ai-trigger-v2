import Link from "next/link";
import { PublicHeader } from "@/components/public-header";

export default function AlertNotFound() {
  return (
    <div className="flex flex-1 flex-col">
      <PublicHeader />
      <main className="mx-auto flex max-w-lg flex-1 flex-col justify-center px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">알림을 찾을 수 없습니다</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          mock 데이터에 해당 ID가 없습니다. 피드에서 다시 선택해 주세요.
        </p>
        <Link
          href="/feed"
          className="mt-8 inline-block rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 no-underline"
        >
          피드로 이동
        </Link>
      </main>
    </div>
  );
}
