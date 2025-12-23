export async function getCsrf() {
  const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/auth/csrf`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch CSRF token');
  return (await res.json()).csrfToken as string;
}

export async function signIn(email: string, password: string) {
  const csrf = await getCsrf();
  const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/auth/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrf,
    },
    body: JSON.stringify({ email, password }),
  });
  return res;
}

export async function getMe() {
  const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/auth/me`, {
    credentials: 'include',
  });
  if (!res.ok) return null;
  return res.json();
}

export async function signOut() {
  const csrf = await getCsrf();
  const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/auth/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'x-csrf-token': csrf,
    },
  });
  return res;
}
