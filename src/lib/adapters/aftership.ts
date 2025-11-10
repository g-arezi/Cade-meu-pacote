// AfterShip - Global package tracking API
// Website: https://www.aftership.com/

const AFTERSHIP_API_KEY = process.env.AFTERSHIP_API_KEY;

export async function trackWithAfterShip(code: string): Promise<any> {
  try {
    // Mock data simulating AfterShip API response
    const mockResponse = {
      tracking: {
        id: code,
        tracking_number: code,
        slug: 'dhl',
        active: true,
        delivery_time: 3,
        tag: 'InTransit',
        checkpoints: [
          {
            created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
            location: 'Hong Kong',
            message: 'Shipment picked up',
            tag: 'InfoReceived'
          },
          {
            created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
            location: 'Hong Kong',
            message: 'Processed at DHL facility',
            tag: 'InTransit'
          },
          {
            created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
            location: 'Shanghai, China',
            message: 'Departed facility',
            tag: 'InTransit'
          },
          {
            created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
            location: 'São Paulo, Brazil',
            message: 'Arrived at destination country',
            tag: 'InTransit'
          }
        ],
        expected_delivery: new Date(Date.now() + 86400000 * 1).toISOString()
      }
    };

    return mockResponse;
  } catch (error) {
    throw new Error('Failed to track with AfterShip API');
  }
}