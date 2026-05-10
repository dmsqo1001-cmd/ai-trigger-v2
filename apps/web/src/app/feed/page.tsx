import { RequireAuth } from "@/components/require-auth";
import { FeedAppShell } from "@/components/app-shell";
import { getAlertsByCreatedAtAsc } from "@/lib/alerts";

export default function FeedPage() {
  const alerts = getAlertsByCreatedAtAsc();

  return (
    <RequireAuth>
      <FeedAppShell alerts={alerts} />
    </RequireAuth>
  );
}
