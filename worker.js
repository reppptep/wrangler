export default {
  async fetch(req) {
    const u = new URL(req.url);
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Max-Age': '86400'
      } });
    }
    if (!u.pathname.startsWith('/bot')) return new Response('tg proxy', { status: 200 });
    const init = { method: req.method, headers: req.headers };
    if (req.method !== 'GET' && req.method !== 'HEAD') init.body = req.body;
    const r = await fetch('https://api.telegram.org' + u.pathname + u.search, init);
    return new Response(r.body, {
      status: r.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': r.headers.get('Content-Type') || 'application/json'
      }
    });
  }
};