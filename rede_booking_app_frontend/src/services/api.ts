const DEFAULT_PORT = Number(process.env.EXPO_PUBLIC_PORT || '3000');
const BASE_URL = `http://localhost:${DEFAULT_PORT}`;

// PUBLIC_INTERFACE
export async function fetchListings() {
  // Placeholder fake data for now
  await delay(250);
  return [
    {
      id: 'room-101',
      title: 'Ocean View Conference Room',
      subtitle: 'Seats 12 • Projector • Whiteboard',
      image: null,
      pricePerHour: 45,
      rating: 4.7,
      location: 'Building A, Floor 10',
    },
    {
      id: 'hall-7',
      title: 'Amber Hall',
      subtitle: 'Events • Capacity 120',
      image: null,
      pricePerHour: 120,
      rating: 4.9,
      location: 'Building C, Ground',
    },
  ];
}

// PUBLIC_INTERFACE
export async function fetchBookingDetails(id: string) {
  await delay(200);
  return {
    id,
    description:
      'Spacious and bright room with an ocean-inspired theme. Perfect for team meetings and client sessions.',
    amenities: ['Projector', 'Whiteboard', 'High-speed Wi-Fi', 'Video Conferencing'],
    rules: ['No smoking', 'Return room to original layout', 'Report damages'],
  };
}

// PUBLIC_INTERFACE
export async function submitBooking(payload: {
  listingId: string;
  date: string;
  time: string;
  durationHours: number;
  attendees: number;
}) {
  await delay(600);
  // placeholder success
  return { success: true, reservationId: `${payload.listingId}-${Date.now()}` };
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export const ApiConfig = {
  BASE_URL,
};
