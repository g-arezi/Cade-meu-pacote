// JadLog - Transportadora brasileira
// Website: https://www.jadlog.com.br/

export async function trackWithJadLog(code: string): Promise<any> {
  try {
    // Mock data simulating JadLog API response
    const mockResponse = {
      codigo: code,
      status: 'EM_TRANSITO',
      eventos: [
        {
          dataHora: new Date(Date.now() - 86400000 * 3).toISOString(),
          cidade: 'São Paulo',
          uf: 'SP',
          descricao: 'Mercadoria coletada',
          status: 'COLETADO'
        },
        {
          dataHora: new Date(Date.now() - 86400000 * 2).toISOString(),
          cidade: 'Barueri',
          uf: 'SP', 
          descricao: 'Mercadoria em trânsito',
          status: 'EM_TRANSITO'
        },
        {
          dataHora: new Date(Date.now() - 86400000 * 1).toISOString(),
          cidade: 'Rio de Janeiro',
          uf: 'RJ',
          descricao: 'Mercadoria saiu para entrega',
          status: 'SAIU_ENTREGA'
        }
      ],
      previsaoEntrega: new Date(Date.now() + 86400000 * 1).toISOString()
    };

    return mockResponse;
  } catch (error) {
    throw new Error('Failed to track with JadLog API');
  }
}