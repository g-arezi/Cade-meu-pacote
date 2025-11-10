import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatTrackingCode(code: string): string {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function getProviderFromCode(code: string): string | undefined {
  const cleaned = formatTrackingCode(code);
  
  // Correios patterns
  if (/^[A-Z]{2}\d{9}[A-Z]{2}$/.test(cleaned)) return 'correios';
  if (/^[A-Z]{2}\d{8}[A-Z]{2}$/.test(cleaned)) return 'correios';
  
  // International patterns (could be 17track)
  if (/^[A-Z0-9]{10,}$/.test(cleaned)) return '17track';
  
  return undefined;
}

export function isValidTrackingCode(code: string): boolean {
  const cleaned = formatTrackingCode(code);
  return cleaned.length >= 8 && /[A-Z0-9]/.test(cleaned);
}