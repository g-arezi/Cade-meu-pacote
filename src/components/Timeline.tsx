import { TrackingEvent } from '@/lib/types/tracking';
import { StatusBadge } from './StatusBadge';

export default function Timeline({ events }: { events: TrackingEvent[] }) {
  if (!events || events.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="text-sm text-neutral-500">Nenhum evento encontrado</div>
          <div className="text-xs text-neutral-400 mt-1">Verifique o código ou tente outro provedor</div>
        </div>
      </div>
    );
  }

  // Sort events by date (oldest first for horizontal timeline)
  const sortedEvents = [...events].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 sm:p-6 overflow-x-auto">
      <div className="relative min-w-max">
        {/* Horizontal line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-neutral-200"></div>
        
        {/* Timeline items */}
        <div className="flex items-start relative" style={{ gap: sortedEvents.length > 4 ? '2rem' : '3rem' }}>
          {sortedEvents.map((ev, idx) => {
            const date = new Date(ev.time);
            
            return (
              <div key={idx} className="flex flex-col items-center relative min-w-0" style={{ minWidth: '120px' }}>
                {/* Circle indicator */}
                <div className={`relative z-10 w-3 h-3 rounded-full border-2 border-white mb-3 ${
                  ev.status === 'delivered' ? 'bg-success-500' : 
                  ev.status === 'exception' ? 'bg-danger-500' : 
                  ev.status === 'out_for_delivery' ? 'bg-orange-500' :
                  ev.status === 'in_transit' ? 'bg-blue-500' :
                  'bg-neutral-400'
                }`} />
                
                {/* Event content */}
                <div className="text-center w-full max-w-28">
                  <time className="block text-xs font-medium text-neutral-500 mb-1">
                    {date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                  </time>
                  <time className="block text-xs text-neutral-400 mb-2">
                    {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </time>
                  
                  <div className="mb-2">
                    <StatusBadge status={ev.status} className="text-xs px-2 py-0.5" />
                  </div>
                  
                  <div className="text-xs font-medium text-neutral-900 mb-1 leading-tight break-words">
                    {ev.description}
                  </div>
                  
                  {ev.location && (
                    <div className="flex items-center justify-center text-xs text-neutral-600">
                      <span className="mr-1">📍</span>
                      <span className="truncate text-center">{ev.location}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
