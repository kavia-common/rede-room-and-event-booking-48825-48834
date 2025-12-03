# Rede Booking App Frontend – Web/Metro notes

If you encounter "Error while reading cache, falling back to a full crawl: Error: Unable to deserialize cloned data" when running `npm run web`, try:

- Ensure dependencies match Expo SDK 53: run `npm ci` (CI) or `npm install`.
- The project includes a `metro.config.js` that places Metro cache in the OS tmp directory to avoid stale cache files.
- If problems persist, clear Expo project state: remove `.expo/` and any system tmp metro caches (not in this repo).
- Confirm Babel config exists (babel-preset-expo) and using `react-native-reanimated/plugin`.

Run web:
- `npm run web -- --port 3000`

Environment:
- EXPO_PUBLIC_PORT=3000 is used by the placeholder API base URL.
