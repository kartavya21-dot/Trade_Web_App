// Admin API Configuration
export const ADMIN_API_BASE_URL = import.meta.env.VITE_ADMIN_API_BASE_URL || "http://localhost:8000";

/**
 * Returns full URL for an admin API endpoint using ADMIN_API_BASE_URL.
 * @param {string} endpoint - API path (e.g. "/login" or "/conversations/waiting")
 */
export const getAdminApiUrl = (endpoint) => {
  const base = ADMIN_API_BASE_URL.replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
};

/**
 * Returns full WebSocket URL for admin connection using ADMIN_API_BASE_URL or VITE_ADMIN_WS_BASE_URL.
 * @param {string} pathWithQuery - WS path with query params (e.g. "/ws/agent?token=xyz")
 */
export const getAdminWsUrl = (pathWithQuery) => {
  if (import.meta.env.VITE_ADMIN_WS_BASE_URL) {
    const wsBase = import.meta.env.VITE_ADMIN_WS_BASE_URL.replace(/\/$/, "");
    const path = pathWithQuery.startsWith("/") ? pathWithQuery : `/${pathWithQuery}`;
    return `${wsBase}${path}`;
  }
  
  const url = new URL(ADMIN_API_BASE_URL);
  const wsProtocol = url.protocol === "https:" ? "wss:" : "ws:";
  const path = pathWithQuery.startsWith("/") ? pathWithQuery : `/${pathWithQuery}`;
  return `${wsProtocol}//${url.host}${path}`;
};
