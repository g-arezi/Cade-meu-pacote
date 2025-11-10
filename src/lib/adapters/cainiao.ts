// Cainiao - Alibaba's logistics platform
export async function trackWithCainiao(code: string): Promise<any> {
  return {
    mailNo: code,
    status: 'TRANSPORT',
    details: [
      { time: new Date(Date.now() - 86400000 * 8).toISOString(), context: '【Guangzhou】Order created, waiting for pickup', status: 'ACCEPT' },
      { time: new Date(Date.now() - 86400000 * 7).toISOString(), context: '【Guangzhou】Package collected by courier', status: 'TRANSPORT' },
      { time: new Date(Date.now() - 86400000 * 6).toISOString(), context: '【Guangzhou Sorting Center】Package arrived', status: 'TRANSPORT' },
      { time: new Date(Date.now() - 86400000 * 4).toISOString(), context: '【Shanghai International】Departed to destination country', status: 'TRANSPORT' },
      { time: new Date(Date.now() - 86400000 * 2).toISOString(), context: '【São Paulo International】Arrived in Brazil', status: 'TRANSPORT' }
    ],
    estimatedDelivery: new Date(Date.now() + 86400000 * 5).toISOString()
  };
}