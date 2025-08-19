export async function apiFetch<T>(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<T> {
    
  const finalInit: RequestInit = { credentials: 'include', ...init };

  const response = await fetch(input, finalInit);

  let data: any = null;
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    const errorMsg = data?.error || response.statusText || 'Error en la solicitud';
    throw new Error(errorMsg);
  }

  return data as T;
}