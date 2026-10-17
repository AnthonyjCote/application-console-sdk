import { createRequire } from "node:module";
import { platformPackage } from "./platform-package.mjs";
const require = createRequire(import.meta.url);
try { require.resolve(platformPackage() + "/package.json"); }
catch { console.warn("AppC native CLI package is unavailable for this platform. Install a supported platform package or use the Rust CLI from source."); }
