export function platformPackage(platform = process.platform, arch = process.arch) {
  const key = platform + "-" + arch;
  const packages = {
    "darwin-arm64":"@application-console/cli-darwin-arm64",
    "darwin-x64":"@application-console/cli-darwin-x64",
    "linux-x64":"@application-console/cli-linux-x64",
    "win32-x64":"@application-console/cli-win32-x64"
  };
  const name = packages[key];
  if (!name) throw new Error("Unsupported AppC CLI platform: " + key);
  return name;
}
