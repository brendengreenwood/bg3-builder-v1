import React, { useEffect, useState } from 'react';

type Entry = {
  id: string;
  type: string;
  name?: string;
  description?: string;
  data?: Record<string, any>;
};

type Dataset = 'community' | 'vanilla';

type Tab = 'spells' | 'items' | 'passives' | 'statuses';

const tabs: Tab[] = ['spells', 'items', 'passives', 'statuses'];

export const LibraryBrowser: React.FC = () => {
  const [dataset, setDataset] = useState<Dataset>('community');
  const [tab, setTab] = useState<Tab>('spells');
  const [q, setQ] = useState('');
  const [rows, setRows] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const url = `/data/${dataset}/${tab}.json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        setRows(Array.isArray(json) ? json : []);
      } catch (e: any) {
        setError(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [dataset, tab]);

  const filtered = rows.filter(r => {
    if (!q) return true;
    const hay = `${r.name ?? ''} ${r.id} ${r.description ?? ''} ${JSON.stringify(r.data ?? {})}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  }).slice(0, 500);

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-purple-900 mt-6">
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex flex-wrap gap-3 items-center">
        <select value={dataset} onChange={e => setDataset(e.target.value as Dataset)} className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm">
          <option value="community">Community</option>
          <option value="vanilla">Vanilla</option>
        </select>
        <div className="flex gap-2">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-3 py-1 rounded text-sm ${tab===t? 'bg-purple-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>{t}</button>
          ))}
        </div>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder={`Search ${tab}...`} className="flex-1 bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm" />
      </div>
      <div className="p-4">
        {loading && <div className="text-gray-400">Loading...</div>}
        {error && <div className="text-red-400">{error}</div>}
        {!loading && !error && (
          <div className="space-y-3">
            {filtered.map((r, i) => (
              <div key={`${r.id}-${i}`} className="p-3 bg-gray-700 rounded">
                <div className="text-purple-300 font-medium">{r.name ?? r.id} <span className="text-xs text-gray-400">({r.type})</span></div>
                {r.description && <div className="text-gray-300 text-sm mt-1">{r.description}</div>}
                <details className="mt-2">
                  <summary className="text-gray-400 text-xs cursor-pointer">Raw</summary>
                  <pre className="text-xs text-gray-200 whitespace-pre-wrap break-words">{JSON.stringify(r, null, 2)}</pre>
                </details>
              </div>
            ))}
            {filtered.length === 0 && <div className="text-gray-400">No results.</div>}
          </div>
        )}
      </div>
    </div>
  );
};

