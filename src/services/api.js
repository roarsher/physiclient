 // Relative requests use the current website's origin.
// Localhost: CRA proxy.
// Vercel: vercel.json rewrites.
export const apiBase = '';

export const mediaUrl = url =>
  url?.startsWith('/') ? apiBase + url : url;

function notifySessionExpired(path, status) {
  if (
    status === 401 &&
    path.startsWith('/api/admin/') &&
    path !== '/api/admin/login'
  ) {
    window.dispatchEvent(new Event('admin-session-expired'));
  }
}

export async function api(path, options = {}) {
  const multipart = options.body instanceof FormData;

  let response;

  try {
    response = await fetch(apiBase + path, {
      ...options,
      credentials: 'include',
      cache: 'no-store',
      headers: {
        ...(!multipart && options.body
          ? { 'Content-Type': 'application/json' }
          : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      'Cannot reach the server. Please try again later.'
    );
  }

  notifySessionExpired(path, response.status);

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      'The API returned an unexpected response. Check the Vercel API rewrite.'
    );
  }

  if (!response.ok || !result.success) {
    const error = new Error(
      result.message || 'Request failed'
    );

    error.status = response.status;
    throw error;
  }

  return result.data;
}

export const submitEnquiry = data =>
  api('/api/enquiries', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export async function downloadCsv(path, name) {
  const response = await fetch(apiBase + path, {
    credentials: 'include',
    cache: 'no-store',
  });

  notifySessionExpired(path, response.status);

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));

    throw new Error(data.message || 'Export failed');
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}