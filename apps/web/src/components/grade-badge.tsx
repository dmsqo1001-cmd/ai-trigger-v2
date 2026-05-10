import type { Grade } from "@/types/alert";

const gradeClass: Record<Grade, string> = {
  S: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  A: "bg-sky-500/20 text-sky-300 border-sky-500/40",
  B: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",
  C: "bg-orange-500/20 text-orange-300 border-orange-500/40",
  F: "bg-red-500/20 text-red-300 border-red-500/40",
};

export function GradeBadge({
  grade,
  compact,
}: {
  grade: Grade;
  compact?: boolean;
}) {
  const cls = gradeClass[grade];
  return (
    <span
      className={`inline-flex items-center rounded border px-2 font-mono text-xs font-semibold ${compact ? "py-0.5 min-w-[2rem] justify-center" : "py-1"} ${cls}`}
    >
      [{grade}]
    </span>
  );
}
