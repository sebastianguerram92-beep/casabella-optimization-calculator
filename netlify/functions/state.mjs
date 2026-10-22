// Shared calculator state: one JSON document in Netlify Blobs.
// GET returns it, PUT replaces it. If the EDIT_PIN env var is set, PUT needs a matching x-pin header.
import { getStore } from "@netlify/blobs";

const KEY = "state";
const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", ...headers },
  });

export default async (req) => {
  const store = getStore({ name: "calculadora", consistency: "strong" });

  if (req.method === "GET") {
    const meta = await store.getMetadata(KEY);
    if (!meta) return json({ error: "empty" }, 404);
    const etag = meta.etag;
    if (req.headers.get("if-none-match") === etag) return new Response(null, { status: 304 });
    const state = await store.get(KEY, { type: "json" });
    return json({ state, etag, savedAt: meta.metadata?.savedAt ?? null });
  }

  if (req.method === "PUT") {
    const pin = process.env.EDIT_PIN;
    if (pin && req.headers.get("x-pin") !== pin) return json({ error: "pin" }, 401);
    let state;
    try { state = await req.json(); } catch { return json({ error: "bad json" }, 400); }
    if (!state || !Array.isArray(state.stock)) return json({ error: "bad state" }, 400);
    const savedAt = new Date().toISOString();
    const res = await store.setJSON(KEY, state, { metadata: { savedAt } });
    return json({ ok: true, etag: res.etag ?? null, savedAt });
  }

  return json({ error: "method" }, 405);
};

export const config = { path: "/api/state" };
