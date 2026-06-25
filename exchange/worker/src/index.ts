export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const url = new URL(request.url);
    const path = url.searchParams.get('path');
    if (!path) {
      return new Response(JSON.stringify({ error: 'Missing path parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const gateUrl = `https://api.gateio.ws/api/v4${path}`;
    const gateParams = new URLSearchParams();
    url.searchParams.forEach((value, key) => {
      if (key !== 'path') gateParams.set(key, value);
    });
    const queryString = gateParams.toString();
    const fullUrl = queryString ? `${gateUrl}?${queryString}` : gateUrl;

    try {
      const res = await fetch(fullUrl, {
        headers: { 'Accept': 'application/json' },
      });
      const body = await res.text();
      return new Response(body, {
        status: res.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=5',
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Proxy fetch failed' }), {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};

interface Env {}
