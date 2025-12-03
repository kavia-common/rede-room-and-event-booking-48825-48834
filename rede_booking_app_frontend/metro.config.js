/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Metro configuration for Expo SDK 53.
 * - Sets cache directory to OS tmp to avoid stale cache deserialize issues in CI.
 * NOTE: This file runs under Node (CJS). Using require/module.exports intentionally.
 */
const { getDefaultConfig } = require('expo/metro-config');
const os = require('os');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Ensure the cache root goes to tmp to avoid serialization mismatch
(async () => {
  try {
    const metroCache = await import('metro-cache');
    const { FileStore } = metroCache;
    // cacheStores is not typed in the exported config shape; set at runtime
    // This reduces stale cache deserialization errors in CI
    // @ts-expect-error - cacheStores is not part of typed config
    config.cacheStores = [
      new FileStore({
        root: path.join(os.tmpdir(), 'metro-cache'),
      }),
    ];
  } catch {
    // In some environments metro-cache may not resolve; continue with defaults.
  }
})();

// Silence some noisy warnings on web by providing a noop reporter
// @ts-expect-error - reporter type not exposed here
config.reporter = { update() {} };

module.exports = config;
