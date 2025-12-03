Ocean Professional Theme
- Colors and typography are defined in src/theme.
- Reusable components are in src/components (Button, Card, Typography).
- Navigation: bottom tabs (Home, Bookings, Profile) with a stack for booking flow (Details -> Calendar -> Confirmation).
- State: src/state/store.tsx provides a lightweight context for listings and booking draft.

Environment
- Copy .env.example to .env if needed and set EXPO_PUBLIC_PORT to align with the preview port for placeholder API base URL.
