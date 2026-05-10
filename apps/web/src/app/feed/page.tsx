import { RequireAuth } from "@/components/require-auth";
import { FeedAppShell } from "@/components/app-shell";
import { getAlertsSorted, listChannels } from "@/lib/alerts";

export default function FeedPage() {
  const alerts = getAlertsSorted();
  const channels = listChannels();

  return (
    <RequireAuth>
      <FeedAppShell alerts={alerts} channels={channels} />
    </RequireAuth>
  );
}
