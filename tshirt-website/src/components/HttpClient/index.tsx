interface HttpError extends Error {
  status: number;
  data: unknown;
}

export class HttpClient {
  baseUrl: string;
  defaultHeaders: Record<string, string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async getAuthHeader(
    requestUrl: string
  ): Promise<Record<string, string>> {
    // Only attempt to attach token for requests to our API base (same origin / baseUrl)
    try {
      if (typeof window === 'undefined') return {};

      // determine absolute URL for request
      const absolute = new URL(requestUrl, window.location.origin).toString();
      const base = this.baseUrl;

      // if the request is not for our API base, don't attach auth header
      if (!absolute.startsWith(base)) return {};

      // use next-auth session if available (client-side)
      try {
        const mod = await import('next-auth/react');
        const session = await mod.getSession();
        const maybeAccess = (session as unknown as { accessToken?: string })
          ?.accessToken;
        if (maybeAccess && typeof maybeAccess === 'string') {
          return { Authorization: `Bearer ${maybeAccess}` };
        }
        const maybeUserToken = (
          session as unknown as { user?: { token?: string } }
        )?.user?.token;
        if (maybeUserToken && typeof maybeUserToken === 'string') {
          return { Authorization: `Bearer ${maybeUserToken}` };
        }
      } catch {
        // next-auth not available or getSession failed; fall back to localStorage
      }

      // fallback to localStorage-stored auth (legacy)
      const raw = localStorage.getItem('auth');
      if (!raw) return {};
      const auth = JSON.parse(raw) as { token?: string } | null;
      if (!auth?.token) return {};
      return { Authorization: `Bearer ${auth.token}` };
    } catch {
      return {};
    }
  }

  private buildUrl(path: string) {
    if (path.startsWith('http')) return path;
    return `${this.baseUrl}/${path.replace(/^\/+/, '')}`;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = this.buildUrl(path);
    const headers = {
      ...this.defaultHeaders,
      ...(await this.getAuthHeader(url)),
    };

    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const err = new Error(data?.message || res.statusText) as HttpError;
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  }

  get<T>(path: string) {
    return this.request<T>('GET', path);
  }
  post<T>(path: string, body?: unknown) {
    return this.request<T>('POST', path, body);
  }
  put<T>(path: string, body?: unknown) {
    return this.request<T>('PUT', path, body);
  }
  delete<T>(path: string) {
    return this.request<T>('DELETE', path);
  }
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  'https://68c8bdb1ceef5a150f623481.mockapi.io/';
const API_ORDER_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ORDER_ENDPOINT ||
  'https://68d374c3214be68f8c65df1d.mockapi.io/';

export const http = new HttpClient(API_BASE);
export const orderHttp = new HttpClient(API_ORDER_ENDPOINT);
