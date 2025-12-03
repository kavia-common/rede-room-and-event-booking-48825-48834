import { getDefaultConfig } from 'expo/metro-config';
import os from 'os';
import path from 'path';

/**
 * Metro configuration for Expo SDK 53.
 * - Sets cache directory to OS tmp to avoid stale cache deserialize issues in CI.
 */
const config = getDefaultConfig(__dirname);

// Provide a minimal local type to avoid using `any`
type MetroFileStoreCtor = new (opts: { root: string }) => unknown;

// Ensure the cache root goes to tmp to avoid serialization mismatch
(async () => {
  try {
    const metroCache = (await import('metro-cache')) as { FileStore: MetroFileStoreCtor };
    const { FileStore } = metroCache;
    // @ts-expect-error: cacheStores is not typed in the exported config shape
    config.cacheStores = [
      new FileStore({
        root: path.join(os.tmpdir(), 'metro-cache'),
      }),
    ];
  } catch {
    // In some environments metro-cache may not resolve; continue with defaults.
  }
})();

// Silence some noisy warnings on web
// @ts-expect-error reporter is not strictly typed here; providing a noop update
config.reporter = { update() {} };

export default config;
