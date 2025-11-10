import { NextRequest } from 'next/server';
// National providers
import { trackWithCorreios } from '@/lib/adapters/correios';
import { trackWithJadLog } from '@/lib/adapters/jadlog';
import { trackWithAzulCargo } from '@/lib/adapters/azul';
import { trackWithTNT } from '@/lib/adapters/tnt';
import { trackWithLoggi } from '@/lib/adapters/loggi';
// International providers
import { trackWith17Track } from '@/lib/adapters/seventeentrack';
import { trackWithTrackMyPackage } from '@/lib/adapters/trackmypackage';
import { trackWithPackageTrackr } from '@/lib/adapters/packagetrackr';
import { trackWithAfterShip } from '@/lib/adapters/aftership';
import { trackWithTrackingMore } from '@/lib/adapters/trackingmore';
import { trackWithParcelsApp } from '@/lib/adapters/parcelsapp';
import { trackWithPkgTracker } from '@/lib/adapters/pkgtracker';
// American providers
import { trackWithEasyPost } from '@/lib/adapters/easypost';
import { trackWithShipEngine } from '@/lib/adapters/shipengine';
import { trackWithShipStation } from '@/lib/adapters/shipstation';
import { trackWithPitneyBowes } from '@/lib/adapters/pitneybowes';
import { trackWithStamps } from '@/lib/adapters/stamps';
// European providers
import { trackWithParcelMonitor } from '@/lib/adapters/parcelmonitor';
import { trackWithTrackingEx } from '@/lib/adapters/trackingex';
import { trackWithWhereIsMyPackage } from '@/lib/adapters/whereismypackage';
// Asian providers
import { trackWithCainiao } from '@/lib/adapters/cainiao';
import { trackWithYunExpress } from '@/lib/adapters/yunexpress';
import { normalizeEvents, normalizeDeliveryEstimate } from '@/lib/types/normalize';
import { isValidTrackingCode, formatTrackingCode } from '@/lib/utils';

export const runtime = 'edge';

// Simple in-memory cache (consider Redis in production)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawCode = searchParams.get('code');
  const provider = searchParams.get('provider');
  
  if (!rawCode) {
    return new Response(JSON.stringify({ error: 'Código de rastreio é obrigatório' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const code = formatTrackingCode(rawCode);
  
  if (!isValidTrackingCode(code)) {
    return new Response(JSON.stringify({ error: 'Formato de código inválido' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Check cache
  const cacheKey = `${code}-${provider || 'all'}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return new Response(JSON.stringify(cached.data), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json', 
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
        'X-Cache': 'HIT'
      },
    });
  }

  const allProviders = [
    // Nacionais
    'correios', 'jadlog', 'azul', 'tnt', 'loggi',
    // Internacionais 
    '17track', 'trackmypackage', 'packagetrackr', 'aftership', 'trackingmore', 'parcelsapp', 'pkgtracker',
    // Americanos
    'easypost', 'shipengine', 'shipstation', 'pitneybowes', 'stamps',
    // Europeus
    'parcelmonitor', 'trackingex', 'whereismypackage',
    // Asiáticos
    'cainiao', 'yunexpress'
  ];
  const providers = provider ? [provider] : allProviders;
  const results: any[] = [];

  // Rate limiting check (basic)
  const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitKey = `rate-${clientIP}`;
  const rateLimitData = cache.get(rateLimitKey);
  if (rateLimitData && rateLimitData.data >= 10) {
    return new Response(JSON.stringify({ error: 'Muitas requisições. Tente novamente em alguns minutos.' }), { 
      status: 429,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Update rate limit
  cache.set(rateLimitKey, { 
    data: (rateLimitData?.data || 0) + 1, 
    timestamp: Date.now() 
  });

  for (const p of providers) {
    try {
      let raw;
      // Nacionais
      if (p === 'correios') raw = await trackWithCorreios(code);
      else if (p === 'jadlog') raw = await trackWithJadLog(code);
      else if (p === 'azul') raw = await trackWithAzulCargo(code);
      else if (p === 'tnt') raw = await trackWithTNT(code);
      else if (p === 'loggi') raw = await trackWithLoggi(code);
      // Internacionais
      else if (p === '17track') raw = await trackWith17Track(code);
      else if (p === 'trackmypackage') raw = await trackWithTrackMyPackage(code);
      else if (p === 'packagetrackr') raw = await trackWithPackageTrackr(code);
      else if (p === 'aftership') raw = await trackWithAfterShip(code);
      else if (p === 'trackingmore') raw = await trackWithTrackingMore(code);
      else if (p === 'parcelsapp') raw = await trackWithParcelsApp(code);
      else if (p === 'pkgtracker') raw = await trackWithPkgTracker(code);
      // Americanos
      else if (p === 'easypost') raw = await trackWithEasyPost(code);
      else if (p === 'shipengine') raw = await trackWithShipEngine(code);
      else if (p === 'shipstation') raw = await trackWithShipStation(code);
      else if (p === 'pitneybowes') raw = await trackWithPitneyBowes(code);
      else if (p === 'stamps') raw = await trackWithStamps(code);
      // Europeus
      else if (p === 'parcelmonitor') raw = await trackWithParcelMonitor(code);
      else if (p === 'trackingex') raw = await trackWithTrackingEx(code);
      else if (p === 'whereismypackage') raw = await trackWithWhereIsMyPackage(code);
      // Asiáticos
      else if (p === 'cainiao') raw = await trackWithCainiao(code);
      else if (p === 'yunexpress') raw = await trackWithYunExpress(code);
      else throw new Error('Provedor inválido');
      
      const events = normalizeEvents(raw, p);
      const estimate = normalizeDeliveryEstimate(raw, p);
      results.push({ provider: p, code, events, estimate });
    } catch (e: any) {
      console.error(`Error tracking with ${p}:`, e.message);
      results.push({ provider: p, code, events: [], error: e.message });
    }
  }

  const response = { results, cached: false };

  // Cache successful responses
  if (results.some(r => r.events.length > 0)) {
    cache.set(cacheKey, { data: response, timestamp: Date.now() });
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 
      'Content-Type': 'application/json', 
      'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      'X-Cache': 'MISS'
    },
  });
}
