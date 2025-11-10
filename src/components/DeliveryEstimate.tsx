import { DeliveryEstimate } from '@/lib/types/tracking';

interface DeliveryEstimateCardProps {
  estimate: DeliveryEstimate | null;
  provider: string;
}

export function DeliveryEstimateCard({ estimate, provider }: DeliveryEstimateCardProps) {
  if (!estimate) return null;

  const formatEstimatedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long',
      year: 'numeric' 
    });
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-success-700 bg-success-100 border-success-200';
      case 'medium': return 'text-warning-700 bg-warning-100 border-warning-200';
      case 'low': return 'text-neutral-700 bg-neutral-100 border-neutral-200';
      default: return 'text-neutral-700 bg-neutral-100 border-neutral-200';
    }
  };

  const getConfidenceLabel = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'Alta confiança';
      case 'medium': return 'Média confiança';
      case 'low': return 'Baixa confiança';
      default: return 'Estimativa';
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">📅</span>
            <h4 className="font-semibold text-neutral-900">Previsão de Entrega</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getConfidenceColor(estimate.confidence || 'medium')}`}>
              {getConfidenceLabel(estimate.confidence || 'medium')}
            </span>
          </div>
          
          {estimate.estimatedDate ? (
            <div className="mb-3">
              <p className="text-lg font-medium text-neutral-900 mb-1">
                {formatEstimatedDate(estimate.estimatedDate)}
              </p>
              <p className="text-sm text-neutral-600">
                Até às 17:00
              </p>
            </div>
          ) : estimate.minDays && estimate.maxDays ? (
            <div className="mb-3">
              <p className="text-lg font-medium text-neutral-900 mb-1">
                {estimate.minDays === estimate.maxDays 
                  ? `Em ${estimate.minDays} dia${estimate.minDays > 1 ? 's' : ''} útil${estimate.minDays > 1 ? 'eis' : ''}`
                  : `Entre ${estimate.minDays} e ${estimate.maxDays} dias úteis`
                }
              </p>
            </div>
          ) : null}
          
          {estimate.reason && (
            <p className="text-xs text-neutral-600 italic">
              {estimate.reason}
            </p>
          )}
        </div>
        
        <div className="text-right">
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
            {provider === 'correios' ? 'Correios' : '17track'}
          </div>
        </div>
      </div>
    </div>
  );
}