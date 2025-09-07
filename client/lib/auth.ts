export interface Claims {
  id: string;
  role: string;
  email: string;
  name: string;
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function decodeToken(token: string | null): Claims | null {
  if (!token) return null;
  try {
    const json = atob(token.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as Claims;
  } catch {
    return null;
  }
}

export function currentUser(): Claims | null {
  return decodeToken(getToken());
}

export function isRole(role: string) {
  return (localStorage.getItem("role") || "") === role;
}
