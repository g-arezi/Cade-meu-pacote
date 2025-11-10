export type TrackingStatus = 'posted' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception' | 'unknown';

export interface TrackingEvent {
  time: string; // ISO
  location?: string;
  status: TrackingStatus;
  description: string;
}

export interface DeliveryEstimate {
  estimatedDate?: string; // ISO date
  minDays?: number;
  maxDays?: number;
  confidence?: 'low' | 'medium' | 'high';
  reason?: string;
}

export interface CorreiosRaw {
  // placeholder for Correios payload
  events?: Array<{ data?: string; hora?: string; local?: string; status?: string; descricao?: string }>;
}

export interface SeventeenTrackRaw {
  // placeholder for 17track payload
  data?: any;
}
