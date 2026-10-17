#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { platformPackage } from "./platform-package.mjs";
const require = createRequire(import.meta.url);
const packageJson = require.resolve(platformPackage() + "/package.json");
const binary = join(dirname(packageJson), "bin", process.platform === "win32" ? "appc.exe" : "appc");
const result = spawnSync(binary, process.argv.slice(2), { stdio: "inherit" });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
