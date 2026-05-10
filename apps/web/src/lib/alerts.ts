import type { Alert } from "@/types/alert";
import { mockAlerts } from "@/data/mockAlerts";

export function getAlertsSorted(): Alert[] {
  return [...mockAlerts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function listChannels(): string[] {
  const set = new Set(mockAlerts.map((a) => a.channel));
  return [...set].sort();
}

export function getAlertById(id: string): Alert | undefined {
  return mockAlerts.find((a) => a.id === id);
}

export function filterAlertsByChannel(
  alerts: Alert[],
  channel: string | null,
): Alert[] {
  if (!channel) return alerts;
  return alerts.filter((a) => a.channel === channel);
}
