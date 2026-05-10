export const MOCK_LOGGED_IN_KEY = "mockLoggedIn";

/** Client-only: guarded by callers */
export function readMockLoggedIn(): boolean {
  try {
    return localStorage.getItem(MOCK_LOGGED_IN_KEY) === "true";
  } catch {
    return false;
  }
}

export function writeMockLoggedIn(): void {
  localStorage.setItem(MOCK_LOGGED_IN_KEY, "true");
}

export function clearMockSession(): void {
  localStorage.removeItem(MOCK_LOGGED_IN_KEY);
}
