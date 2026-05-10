import Link from "next/link";
import { PublicHeader } from "@/components/public-header";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-14 px-4 py-10 sm:gap-16 sm:py-12">
        <section className="rounded-2xl border border-[var(--border)] bg-[#202636] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            real-time information monitoring
          </p>
          <h1 className="mt-3 whitespace-nowrap text-[clamp(1.25rem,4.2vw,3rem)] font-extrabold tracking-[-0.02em] text-white">
            급등주 신호를 포착하는, AI TRIGGER
          </h1>
          <div className="mt-5 max-w-3xl space-y-3 text-base leading-8 text-[#dbdee1] sm:text-lg">
            <p>AI TRIGGER는 미국 증시 급등주 후보를 빠르게 파악하기 위한 정보 분석형 실시간 모니터링 서비스입니다.</p>
            <p>단순 가격 움직임만 보지 않습니다.</p>
            <p>뉴스 성격, 유동주식수, SEC 공시 리스크, 숏 가능성, 호재 지속성을 함께 구조화해 보여줍니다.</p>
          </div>
          <ul className="mt-5 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--muted)] sm:text-base">
            <li>정규장 시작 전, 자체 로직으로 감시 종목군을 갱신합니다.</li>
            <li>장중에는 뉴스와 공시성 이벤트를 실시간 분석합니다.</li>
            <li>결과는 등급과 TRIGGER AI 한줄평으로 요약해 제공합니다.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/feed"
              className="rounded-md bg-[rgb(52,195,122)] px-5 py-3 text-sm font-semibold !text-white no-underline transition hover:brightness-110"
            >
              라이브 피드 예시 보기
            </Link>
            <Link
              href="/pricing"
              className="rounded-md border border-white bg-[#171c27] px-5 py-3 text-sm font-semibold !text-[rgb(52,195,122)] no-underline transition hover:bg-[#212939] hover:!text-[rgb(52,195,122)]"
            >
              요금 확인하기
            </Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--sidebar)] p-6 sm:col-span-2">
            <h2 className="text-xl font-semibold text-white">왜 이 화면이 필요한가</h2>
            <div className="mt-4 max-w-3xl space-y-3 text-sm leading-7 text-[#dbdee1] sm:text-base">
              <p>미국 증시는 국내 증시처럼 일일 상한가 제한이 없습니다.</p>
              <p>하루에도 큰 폭으로 움직이는 종목이 자주 발생합니다.</p>
              <p>하지만 이런 종목을 감으로 따라가는 것은 위험합니다.</p>
              <p>급등주는 갑자기 움직이는 것처럼 보이지만, 그 전에 뉴스와 공시, 유동주식수, 수급 조건이 먼저 움직이는 경우가 많습니다.</p>
              <p>문제는 이 정보를 여러 사이트에서 따로 확인하기에 시장 속도가 너무 빠르다는 점입니다.</p>
            </div>
            <ul className="mt-5 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--muted)] sm:text-base">
              <li>핵심 정보를 한 화면에서 확인할 수 있습니다.</li>
              <li>장중 판단에 필요한 맥락을 빠르게 읽을 수 있습니다.</li>
              <li>정보 탐색 시간을 줄이고 모니터링 집중도를 높일 수 있습니다.</li>
            </ul>
          </div>

          <article className="rounded-xl border border-[var(--border)] bg-[var(--sidebar)] p-6">
            <h3 className="text-lg font-semibold text-white">AI TRIGGER가 하는 일</h3>
            <div className="mt-4 max-w-2xl space-y-3 text-sm leading-7 text-[#dbdee1]">
              <p>매일 정규장 시작 전, 당일 급등 후보 조건을 가진 티커를 갱신합니다.</p>
              <p>기준은 가격, 유동주식수, IPO 여부, 숏 관심도입니다.</p>
              <p>장중에는 뉴스, 공시성 이벤트, 시장 정보를 실시간으로 확인합니다.</p>
            </div>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--muted)]">
              <li>뉴스 강도, 호재 지속성, SEC 리스크, 숏 가능성을 S/A/B/C/F로 정리합니다.</li>
              <li>결과를 TRIGGER AI 한줄평과 함께 피드에 표시합니다.</li>
              <li>호재성 이벤트와 리스크성 이벤트를 구분해 제공합니다.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-[var(--border)] bg-[var(--sidebar)] p-6">
            <h3 className="text-lg font-semibold text-white">서비스 작동 방식 4단계</h3>
            <div className="mt-3 grid gap-3 text-sm">
              <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar-deep)] p-4">
                <p className="font-semibold text-white">1) 정규장 시작 전 감시 종목군 생성</p>
                <p className="mt-2 text-[var(--muted)] leading-7">
                  가격, 유동주식수, IPO, 숏 관심도를 기준으로 당일 감시 티커를 선별합니다.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar-deep)] p-4">
                <p className="font-semibold text-white">2) 뉴스 이벤트 감지</p>
                <p className="mt-2 text-[var(--muted)] leading-7">
                  감시 종목군에 포함된 티커에서 발생하는 뉴스와 시장 이벤트를 추적합니다.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar-deep)] p-4">
                <p className="font-semibold text-white">3) SEC 리스크 확인</p>
                <p className="mt-2 text-[var(--muted)] leading-7">
                  최근 공시, 자금조달 가능성, 구조적 리스크 요소를 함께 확인합니다.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar-deep)] p-4">
                <p className="font-semibold text-white">4) TRIGGER 피드 출력</p>
                <p className="mt-2 text-[var(--muted)] leading-7">
                  뉴스 강도, 리스크, 숏 가능성, TRIGGER AI 한줄평을 라이브 피드로
                  정리합니다.
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-[var(--accent)] bg-[#121926] p-6 shadow-[0_0_0_1px_rgba(88,101,242,0.25)] sm:p-8">
          <h2 className="text-xl font-semibold text-white">실제 피드 예시</h2>
          <div className="mt-4 rounded-xl border border-[var(--border)] bg-[#0f141f] p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">
              SSS) NEW TRIGGER
            </p>
            <p className="mt-2 text-2xl font-bold text-white">ASDA · $1.20</p>
            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar)] p-4">
                <p className="font-semibold text-white">최신 뉴스</p>
                <p className="mt-2 leading-7 text-[#dbdee1]">핵심 호재성 이벤트 감지 [S]</p>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar)] p-4">
                <p className="font-semibold text-white">SEC 리스크</p>
                <p className="mt-2 leading-7 text-[#dbdee1]">최근 공시 리스크 확인 [B]</p>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar)] p-4">
                <p className="font-semibold text-white">숏 가능성</p>
                <p className="mt-2 leading-7 text-[#dbdee1]">[A]</p>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--sidebar)] p-4">
                <p className="font-semibold text-white">TRIGGER AI 한줄평</p>
                <div className="mt-2 space-y-2 text-[#dbdee1]">
                  <p>주가를 빠르게 끌어올릴 수 있는 호재가 확인됩니다.</p>
                  <p>일부 공시 리스크도 함께 감지되어 관찰 필요 구간입니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-[var(--border)] bg-[var(--sidebar)] p-6">
            <h3 className="text-lg font-semibold text-white">등급 체계 안내</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#dbdee1]">
              <li>S: 강한 이벤트</li>
              <li>A: 긍정적 이벤트</li>
              <li>B: 보통 이상</li>
              <li>C: 약한 이벤트 또는 추가 확인 필요</li>
              <li>F: 리스크 우세 또는 부정적 요소 확인</li>
            </ul>
            <div className="mt-4 space-y-2 text-sm leading-7 text-[var(--muted)]">
              <p>실제 저장 등급은 S/A/B/C/F만 사용합니다.</p>
              <p>카드 상단의 SSS, AAA, BBB, CCC, FFF는 화면 표시용 라벨입니다.</p>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--muted)]">
              <li>뉴스 등급 S -&gt; SSS) NEW TRIGGER</li>
              <li>뉴스 등급 A -&gt; AAA) NEW TRIGGER</li>
              <li>뉴스 등급 B -&gt; BBB) NEW TRIGGER</li>
              <li>뉴스 등급 C -&gt; CCC) NEW TRIGGER</li>
              <li>뉴스 등급 F -&gt; FFF) NEW TRIGGER</li>
            </ul>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              등급은 매수·매도 신호가 아닙니다. 이벤트와 리스크를 빠르게 구분하기 위한 정보 정리 기준입니다.
            </p>
          </article>

          <article className="rounded-xl border border-[var(--border)] bg-[var(--sidebar)] p-6">
            <h3 className="text-lg font-semibold text-white">요금</h3>
            <ul className="mt-3 space-y-3 text-sm text-[#dbdee1]">
              <li className="rounded-md border border-[var(--border)] bg-[var(--sidebar-deep)] px-3 py-2">
                1개월 29,900원
              </li>
              <li className="rounded-md border border-[var(--border)] bg-[var(--sidebar-deep)] px-3 py-2">
                3개월 84,900원
              </li>
              <li className="rounded-md border border-[var(--border)] bg-[var(--sidebar-deep)] px-3 py-2">
                12개월 299,000원
              </li>
            </ul>
          </article>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--sidebar)] p-6">
          <h3 className="text-lg font-semibold text-white">이용 대상</h3>
          <ul className="mt-3 grid gap-2 text-sm text-[#dbdee1] sm:grid-cols-2">
            <li className="rounded-md border border-[var(--border)] bg-[var(--sidebar-deep)] px-3 py-2">
              미국 증시 급등주를 장중에 확인하는 투자자
            </li>
            <li className="rounded-md border border-[var(--border)] bg-[var(--sidebar-deep)] px-3 py-2">
              뉴스와 공시를 따로 확인하는 데 시간이 오래 걸리는 사람
            </li>
            <li className="rounded-md border border-[var(--border)] bg-[var(--sidebar-deep)] px-3 py-2">
              단순 가격 움직임이 아니라 뉴스와 리스크를 함께 보고 싶은 사람
            </li>
            <li className="rounded-md border border-[var(--border)] bg-[var(--sidebar-deep)] px-3 py-2">
              당일 이벤트가 발생한 티커를 한 화면에서 정리해 보고 싶은 사람
            </li>
            <li className="rounded-md border border-[var(--border)] bg-[var(--sidebar-deep)] px-3 py-2 sm:col-span-2">
              급등주 시장에서 정보 확인 속도를 높이고 싶은 사람
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-[#3f465a] bg-[#111723] p-5 text-sm leading-8 text-[#c4cad3]">
          <div className="space-y-2">
            <p>본 서비스는 투자 권유가 아닌 정보 제공형 모니터링 서비스입니다.</p>
            <p>특정 종목의 매수·매도 판단과 투자 결과는 이용자 본인의 책임입니다.</p>
            <p>AI TRIGGER는 뉴스, 공시, 유동주식수, 숏 가능성 등 판단에 필요한 정보를 구조화해 제공하는 것을 목적으로 합니다.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
