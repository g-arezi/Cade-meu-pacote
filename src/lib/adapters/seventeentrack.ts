import { SeventeenTrackRaw } from '@/lib/types/tracking';

const API_KEY = process.env.SEVENTEENTRACK_API_KEY;

export async function trackWith17Track(code: string): Promise<SeventeenTrackRaw & { estimate?: any }> {
  // Placeholder: 17track requer key e endpoints específicos.
  // Documentação: https://developers.17track.net/ (não incluída aqui por política)
  if (!API_KEY) {
    // mock se não houver chave
    const mockEvents = [
      { time_iso: new Date(Date.now()-86400000*3).toISOString(), location: 'CN', status_text: 'In transit', description: 'Shipment picked up' },
      { time_iso: new Date(Date.now()-86400000*1).toISOString(), location: 'BR', status_text: 'In transit', description: 'Arrived at facility' },
      { time_iso: new Date().toISOString(), location: 'BR', status_text: 'Out for delivery', description: 'Saiu para entrega' },
    ];
    
    return { 
      data: { events: mockEvents },
      estimate: {
        estimatedDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
        minDays: 1,
        maxDays: 4,
        confidence: 'medium',
        reason: 'International shipping estimate'
      }
    };
  }
  try {
    // const res = await fetch('https://api.17track.net/track', { ... });
    // return await res.json();
    return { data: { events: [] } };
  } catch (e: any) {
    throw new Error('Falha ao consultar 17track');
  }
}
