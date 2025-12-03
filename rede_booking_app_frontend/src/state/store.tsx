import React, { createContext, useContext, useMemo, useState } from 'react';

type Listing = {
  id: string;
  title: string;
  subtitle: string;
  image: string | null;
  pricePerHour: number;
  rating: number;
  location: string;
};

type BookingDraft = {
  listingId?: string;
  date?: string; // ISO
  time?: string; // HH:mm
  durationHours?: number;
  attendees?: number;
};

type StoreShape = {
  listings: Listing[];
  setListings: (l: Listing[]) => void;
  bookingDraft: BookingDraft;
  setBookingDraft: (b: BookingDraft) => void;
};

const StoreContext = createContext<StoreShape | undefined>(undefined);

// PUBLIC_INTERFACE
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [bookingDraft, setBookingDraft] = useState<BookingDraft>({});

  const value = useMemo(
    () => ({ listings, setListings, bookingDraft, setBookingDraft }),
    [listings, bookingDraft]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// PUBLIC_INTERFACE
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
