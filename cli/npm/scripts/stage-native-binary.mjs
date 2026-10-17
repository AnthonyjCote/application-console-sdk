import { chmodSync, copyFileSync, mkdirSync, statSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import process from "node:process";

const [suffix, source] = process.argv.slice(2);
if (!suffix || !source) {
  throw new Error("Usage: node stage-native-binary.mjs <platform-suffix> <binary-path>");
}

const supported = new Set(["darwin-arm64","darwin-x64","linux-x64","win32-x64"]);
if (!supported.has(suffix)) throw new Error("Unsupported AppC CLI platform package: " + suffix);

const sourcePath = resolve(source);
if (!statSync(sourcePath).isFile()) throw new Error("Native AppC CLI binary was not found: " + sourcePath);

const fileName = suffix.startsWith("win32-") ? "appc.exe" : "appc";
const destination = resolve("cli/npm/platforms", suffix, "bin", fileName);
mkdirSync(dirname(destination), { recursive: true });
copyFileSync(sourcePath, destination);
if (!suffix.startsWith("win32-")) chmodSync(destination, 0o755);

console.log(destination);
