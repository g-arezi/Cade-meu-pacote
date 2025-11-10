import { TrackingEvent, TrackingStatus, CorreiosRaw, SeventeenTrackRaw, DeliveryEstimate } from './tracking';

export function normalizeEvents(raw: (CorreiosRaw | SeventeenTrackRaw) & { estimate?: any }, provider: string): TrackingEvent[] {
  return normalizeEventsOnly(raw, provider);
}

export function normalizeEventsOnly(raw: any, provider: string): TrackingEvent[] {
  if (provider === 'correios') {
    const events = raw.events || [];
    return events.map((e: any) => {
      const date = e.data || '';
      const time = e.hora || '00:00';
      const iso = toISO(date, time);
      return {
        time: iso,
        location: e.local,
        status: mapStatus(e.status || e.descricao || ''),
        description: e.descricao || e.status || '',
      };
    }).sort((a: TrackingEvent, b: TrackingEvent) => (a.time < b.time ? 1 : -1));
  }
  
  if (provider === '17track') {
    const data = raw.data || {};
    const arr: any[] = data.events || [];
    return arr.map((ev) => ({
      time: ev.time_iso || ev.time || new Date().toISOString(),
      location: ev.location || ev.place,
      status: mapStatus(ev.status_text || ev.stage || ''),
      description: ev.desc || ev.description || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }
  
  if (provider === 'trackmypackage') {
    const events = raw.events || [];
    return events.map((e: any) => ({
      time: e.timestamp,
      location: e.location,
      status: mapStatus(e.status || ''),
      description: e.description || e.status || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }
  
  if (provider === 'packagetrackr') {
    const events = raw.trackingHistory || [];
    return events.map((e: any) => ({
      time: e.date,
      location: e.location,
      status: mapStatus(e.activity || ''),
      description: e.activity || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }
  
  if (provider === 'aftership') {
    const checkpoints = raw.tracking?.checkpoints || [];
    return checkpoints.map((e: any) => ({
      time: e.created_at,
      location: e.location,
      status: mapStatus(e.message || e.tag || ''),
      description: e.message || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }
  
  if (provider === 'easypost') {
    const events = raw.tracking_details || [];
    return events.map((e: any) => ({
      time: e.datetime,
      location: e.location ? `${e.location.city}, ${e.location.state}` : '',
      status: mapStatus(e.status || e.message || ''),
      description: e.message || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }
  
  if (provider === 'shipengine') {
    const events = raw.events || [];
    return events.map((e: any) => ({
      time: e.occurred_at,
      location: e.city_locality ? `${e.city_locality}, ${e.state_province}` : '',
      status: mapStatus(e.description || ''),
      description: e.description || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }
  
  if (provider === 'trackingmore') {
    const events = raw.destination_info?.trackinfo || [];
    return events.map((e: any) => ({
      time: e.Date,
      location: '', // TrackingMore doesn't always provide location
      status: mapStatus(e.StatusDescription || ''),
      description: e.Details || e.StatusDescription || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  // Brazilian providers
  if (provider === 'jadlog') {
    const events = raw.eventos || [];
    return events.map((e: any) => ({
      time: e.dataHora,
      location: e.cidade ? `${e.cidade}/${e.uf}` : '',
      status: mapStatus(e.status || e.descricao || ''),
      description: e.descricao || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  if (provider === 'azul') {
    const events = raw.events || [];
    return events.map((e: any) => ({
      time: e.date,
      location: e.location || '',
      status: mapStatus(e.event || ''),
      description: e.details || e.event || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  if (provider === 'tnt') {
    const events = raw.events || [];
    return events.map((e: any) => ({
      time: e.date,
      location: e.location || '',
      status: mapStatus(e.status || ''),
      description: e.description || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  if (provider === 'loggi') {
    const events = raw.route || [];
    return events.map((e: any) => ({
      time: e.timestamp,
      location: e.address || '',
      status: mapStatus(e.status || e.event || ''),
      description: e.event || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  // International providers
  if (provider === 'parcelsapp') {
    const events = raw.checkpoints || [];
    return events.map((e: any) => ({
      time: e.date,
      location: e.location || '',
      status: mapStatus(e.status || ''),
      description: e.status_details || e.status || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  if (provider === 'pkgtracker') {
    const events = raw.events || [];
    return events.map((e: any) => ({
      time: e.timestamp,
      location: e.location || '',
      status: mapStatus(e.event || ''),
      description: e.description || e.event || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  // American providers
  if (provider === 'shipstation') {
    const events = raw.trackingEvents || [];
    return events.map((e: any) => ({
      time: e.eventDate,
      location: e.eventCity ? `${e.eventCity}, ${e.eventState}` : '',
      status: mapStatus(e.eventDescription || ''),
      description: e.eventDescription || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  if (provider === 'pitneybowes') {
    const events = raw.eventHistory || [];
    return events.map((e: any) => ({
      time: e.eventDateTime,
      location: e.eventLocation ? `${e.eventLocation.city}, ${e.eventLocation.stateOrProvince}` : '',
      status: mapStatus(e.eventType || e.eventDescription || ''),
      description: e.eventDescription || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  if (provider === 'stamps') {
    const events = raw.events || [];
    return events.map((e: any) => ({
      time: e.date,
      location: e.location || '',
      status: mapStatus(e.status || e.description || ''),
      description: e.description || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  // European providers
  if (provider === 'parcelmonitor') {
    const events = raw.timeline || [];
    return events.map((e: any) => ({
      time: e.timestamp,
      location: e.location || '',
      status: mapStatus(e.event || ''),
      description: e.details || e.event || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  if (provider === 'trackingex') {
    const events = raw.events || [];
    return events.map((e: any) => ({
      time: e.date,
      location: e.location || '',
      status: mapStatus(e.status || ''),
      description: e.description || e.status || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  if (provider === 'whereismypackage') {
    const events = raw.history || [];
    return events.map((e: any) => ({
      time: e.datetime,
      location: e.location || '',
      status: mapStatus(e.status_code || e.message || ''),
      description: e.message || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  // Asian providers
  if (provider === 'cainiao') {
    const events = raw.details || [];
    return events.map((e: any) => ({
      time: e.time,
      location: '', // Extract from context if needed
      status: mapStatus(e.status || e.context || ''),
      description: e.context || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  if (provider === 'yunexpress') {
    const events = raw.trackingEvents || [];
    return events.map((e: any) => ({
      time: e.eventTime,
      location: e.eventLocation || '',
      status: mapStatus(e.eventStatus || e.eventDescription || ''),
      description: e.eventDescription || '',
    })).sort((a, b) => (a.time < b.time ? 1 : -1));
  }
  
  return [];
}

function toISO(dateBr: string, time: string) {
  // try dd/MM/yyyy and HH:mm
  const [d, m, y] = dateBr.split('/').map((v) => parseInt(v, 10));
  const [hh, mm] = time.split(':').map((v) => parseInt(v, 10));
  if (!y || !m || !d) return new Date().toISOString();
  const dt = new Date(Date.UTC(y, (m - 1), d, hh || 0, mm || 0));
  return dt.toISOString();
}

export function normalizeDeliveryEstimate(raw: any, provider: string): DeliveryEstimate | null {
  // Handle direct estimate object (correios, 17track, trackmypackage)
  if (raw?.estimate) {
    const estimate = raw.estimate;
    return {
      estimatedDate: estimate.estimatedDate,
      minDays: estimate.minDays,
      maxDays: estimate.maxDays,
      confidence: estimate.confidence || 'medium',
      reason: estimate.reason
    };
  }
  
  // Handle specific provider formats
  if (provider === 'packagetrackr' && raw.deliveryEstimate) {
    return {
      estimatedDate: raw.deliveryEstimate.expectedDate,
      confidence: raw.deliveryEstimate.confidence || 'medium',
      reason: `Business days in transit: ${raw.deliveryEstimate.businessDaysInTransit}`
    };
  }
  
  if (provider === 'aftership' && raw.tracking?.expected_delivery) {
    return {
      estimatedDate: raw.tracking.expected_delivery,
      confidence: 'high',
      reason: 'AfterShip carrier estimate'
    };
  }
  
  if (provider === 'easypost' && raw.est_delivery_date) {
    return {
      estimatedDate: raw.est_delivery_date,
      confidence: 'high',
      reason: 'EasyPost carrier estimate'
    };
  }
  
  if (provider === 'shipengine' && raw.estimated_delivery_date) {
    return {
      estimatedDate: raw.estimated_delivery_date,
      confidence: 'high',
      reason: 'ShipEngine carrier estimate'
    };
  }
  
  if (provider === 'trackingmore' && raw.scheduled_delivery_date) {
    return {
      estimatedDate: raw.scheduled_delivery_date,
      confidence: 'medium',
      reason: 'TrackingMore estimate'
    };
  }
  
  return null;
}

function mapStatus(text: string): TrackingStatus {
  const t = text.toLowerCase();
  if (/(postado|postagem|objeto postado)/.test(t)) return 'posted';
  if (/(em trânsito|encaminhado|transito|received|in transit)/.test(t)) return 'in_transit';
  if (/(saiu para entrega|out for delivery)/.test(t)) return 'out_for_delivery';
  if (/(entregue|delivered)/.test(t)) return 'delivered';
  if (/(falha|devolvido|retido|exception|failed)/.test(t)) return 'exception';
  return 'unknown';
}
