"use client";
import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import Timeline from '@/components/Timeline';
import { LoadingSkeleton } from '@/components/LoadingSpinner';
import { DeliveryEstimateCard } from '@/components/DeliveryEstimate';
import { TrackingEvent } from '@/lib/types/tracking';
import ReCAPTCHA from 'react-google-recaptcha';

interface UnifiedResponse {
  provider: string;
  code: string;
  events: TrackingEvent[];
  estimate?: any;
  status?: string;
  error?: string;
}

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<UnifiedResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchCode, setLastSearchCode] = useState<string>('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  function getProviderEmoji(provider: string): string {
    const emojis: Record<string, string> = {
      // Nacionais
      correios: '📦', jadlog: '📬', azul: '✈️', tnt: '🔥', loggi: '🏍️',
      // Internacionais
      '17track': '🌐', trackmypackage: '📍', packagetrackr: '📊', aftership: '🚀',
      trackingmore: '📈', parcelsapp: '📦', pkgtracker: '🗺️',
      // Americanos
      easypost: '📮', shipengine: '⚓', shipstation: '🚢', pitneybowes: '🏢', stamps: '📮',
      // Europeus
      parcelmonitor: '🔍', trackingex: '📊', whereismypackage: '🤔',
      // Asiáticos
      cainiao: '🐲', yunexpress: '☁️'
    };
    return emojis[provider] || '📦';
  }

  function getProviderName(provider: string): string {
    const names: Record<string, string> = {
      // Nacionais
      correios: 'Correios', jadlog: 'JadLog', azul: 'Azul Cargo', tnt: 'TNT Mercurio', loggi: 'Loggi',
      // Internacionais
      '17track': '17track', trackmypackage: 'TrackMyPackage', packagetrackr: 'PackageTrackr', 
      aftership: 'AfterShip', trackingmore: 'TrackingMore', parcelsapp: 'Parcels App', pkgtracker: 'Package Tracker',
      // Americanos
      easypost: 'EasyPost', shipengine: 'ShipEngine', shipstation: 'ShipStation', 
      pitneybowes: 'Pitney Bowes', stamps: 'Stamps.com',
      // Europeus
      parcelmonitor: 'ParcelMonitor', trackingex: 'TrackingEx', whereismypackage: 'WhereIsMyPackage',
      // Asiáticos
      cainiao: 'Cainiao (Alibaba)', yunexpress: 'YunExpress'
    };
    return names[provider] || provider.charAt(0).toUpperCase() + provider.slice(1);
  }

  function handleCaptchaChange(value: string | null) {
    setCaptchaVerified(!!value);
  }

  async function handleSearch(code: string, provider?: string) {
    if (!captchaVerified) {
      setError('Por favor, complete o CAPTCHA antes de buscar.');
      return;
    }
    setLoading(true); setError(null); setResults(null);
    setLastSearchCode(code);
    
    try {
      const url = provider ? `/api/track?code=${encodeURIComponent(code)}&provider=${provider}` : `/api/track?code=${encodeURIComponent(code)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro desconhecido');
      setResults(data.results);
    } catch (e:any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Rastreamento de Pacotes</h1>
        <p className="text-neutral-600">Consulte simultaneamente em múltiplos provedores</p>
      </div>

      <ReCAPTCHA
        sitekey="6LeiOgksAAAAAI4EHzl9qoj-D5BmrCS9qdW1hQ6r"
        onChange={handleCaptchaChange}
      />

      <SearchForm onSearch={handleSearch} loading={loading} />
      
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-start">
            <span className="text-red-500 mr-2">⚠️</span>
            <div>
              <h3 className="text-sm font-medium text-red-800">Erro na consulta</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {loading && (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-neutral-600">Consultando código <span className="font-mono font-medium">{lastSearchCode}</span>...</p>
          </div>
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      )}
      
      {results && results.length > 0 && (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-neutral-900">Resultados para <span className="font-mono bg-neutral-100 px-2 py-1 rounded">{lastSearchCode}</span></h2>
          </div>
          {results.map(r => (
            <div key={r.provider} className="space-y-6">
              <div className="bg-white rounded-lg border border-neutral-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {getProviderEmoji(r.provider)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {getProviderName(r.provider)}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {r.events.length} evento{r.events.length !== 1 ? 's' : ''} encontrado{r.events.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  {r.error && (
                    <div className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">
                      Erro: {r.error}
                    </div>
                  )}
                </div>
                <DeliveryEstimateCard estimate={r.estimate} provider={r.provider} />
                <Timeline events={r.events} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
