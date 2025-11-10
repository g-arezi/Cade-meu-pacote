"use client";
import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export default function SearchForm({ onSearch, loading }: { onSearch: (code: string, provider?: string) => void; loading: boolean; }) {
  const [code, setCode] = useState('');
  const [provider, setProvider] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code && !loading) {
      onSearch(code, provider || undefined);
    }
  };

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Código de rastreio
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Ex: LB123456789BR, SS987654321US"
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 placeholder-neutral-400 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
              disabled={loading}
            />
          </div>
          <div className="sm:w-40">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Provedor
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
              disabled={loading}
            >
              <option value="">Todos os Provedores (20+)</option>
              <optgroup label="🇧🇷 Nacionais">
                <option value="correios">📦 Correios</option>
                <option value="jadlog">📬 JadLog</option>
                <option value="azul">✈️ Azul Cargo</option>
                <option value="tnt">🔥 TNT Mercurio</option>
                <option value="loggi">🏍️ Loggi</option>
              </optgroup>
              <optgroup label="🌍 Internacionais">
                <option value="17track">🌐 17track</option>
                <option value="trackmypackage">📍 TrackMyPackage</option>
                <option value="packagetrackr">📊 PackageTrackr</option>
                <option value="aftership">🚀 AfterShip</option>
                <option value="trackingmore">📈 TrackingMore</option>
                <option value="parcelsapp">📦 Parcels App</option>
                <option value="pkgtracker">🗺️ Package Tracker</option>
              </optgroup>
              <optgroup label="🇺🇸 Americanos">
                <option value="easypost">📮 EasyPost</option>
                <option value="shipengine">⚓ ShipEngine</option>
                <option value="shipstation">🚢 ShipStation</option>
                <option value="pitneybowes">🏢 Pitney Bowes</option>
                <option value="stamps">📮 Stamps.com</option>
              </optgroup>
              <optgroup label="🇪🇺 Europeus">
                <option value="parcelmonitor">🔍 ParcelMonitor</option>
                <option value="trackingex">📊 TrackingEx</option>
                <option value="whereismypackage">🤔 WhereIsMyPackage</option>
              </optgroup>
              <optgroup label="🇨🇳 Asiáticos">
                <option value="cainiao">🐲 Cainiao (Alibaba)</option>
                <option value="yunexpress">☁️ YunExpress</option>
              </optgroup>
            </select>
          </div>
          <button
            type="submit"
            disabled={!code || loading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand-600 px-6 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <LoadingSpinner size="sm" />}
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>
    </div>
  );
}
