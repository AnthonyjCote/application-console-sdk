# @application-console/appc-sdk

Host-neutral guest SDK for AppC applications.

App code imports this package instead of calling Tauri, browser persistence, native plugins, or operating-system APIs directly.

## Imports

The ergonomic root import exposes all implemented capability families:

```ts
import {
  runtime,
  storage,
  sql,
  files,
  workspace,
  watch,
  network,
  secrets,
  clipboard,
  notifications,
  external,
  windowControl,
  system,
  media,
  process,
  terminal,
  background,
  scheduler,
  agent
} from "@application-console/appc-sdk";
```

Narrow subpath imports are first-class public entrypoints and are preferred when an application uses only a small capability set:

```ts
import { storage } from "@application-console/appc-sdk/storage";
import { workspace } from "@application-console/appc-sdk/workspace";
import { terminal } from "@application-console/appc-sdk/terminal";
```

The package is ESM, emits TypeScript declarations/declaration maps, and is marked side-effect free so bundlers can tree-shake unused capability modules.

## Runtime and capability detection

```ts
const info = await runtime.info();

if (await runtime.hasCapability("sql")) {
  // SQL is available in this host.
}

await runtime.requireCapability("workspace");
```

`runtime.info()` includes a host-attested caller context such as foreground, background, scheduler, watch, or agent. Guest code cannot choose or forge that context.

Manifest declaration, host availability, and user permission are separate checks. A host reporting a capability as available does not imply that a package declared it or that the user has granted privileged authority.

## Errors

Host protocol failures reject with `AppcHostRequestFailure`:

```ts
import { AppcHostRequestFailure, storage } from "@application-console/appc-sdk";

try {
  await storage.set("theme", "dark");
} catch (error) {
  if (error instanceof AppcHostRequestFailure) {
    console.error(error.code, error.message);
  }
}
```

The `code` is stable machine-readable host failure information. The message is human-readable context.

Browser-native cancellation uses the standard `AbortError`.

## Cancellation

Implemented SDK operations accept a trailing request-options object with an optional `AbortSignal`.

```ts
const controller = new AbortController();

const promise = workspace.request("Project", {
  signal: controller.signal
});

controller.abort();
await promise;
```

Existing calls remain valid without request options.

Some APIs already have capability-specific options. For example:

```ts
await network.fetch("https://api.example.com/data", {
  method: "GET",
  signal: controller.signal
});
```

Cancellation stops waiting on the SDK transport. It does not imply rollback of a host operation that has already completed.

## Capability families

Current public modules include:

- `runtime` — runtime metadata, capability discovery, one-shot completion;
- `storage` — app-private structured storage;
- `sql` — app-private managed SQL;
- `files` — app-private files plus user-mediated open/save;
- `workspace` — opaque user-approved workspace grants and scoped file access;
- `watch` — scoped filesystem watches tied to workspace grants;
- `network` — explicitly declared and user-approved HTTPS origins;
- `secrets` — host-managed operating-system credential storage;
- `clipboard`, `notifications`, `external`, `window` — conventional desktop primitives;
- `system` — bounded non-identifying OS/architecture information;
- `media` — user-mediated image/audio/video file selection;
- `process` — high-authority managed child processes;
- `terminal` — high-authority managed PTY sessions;
- `background` — supervised persistent headless runtime;
- `scheduler` — durable recurring headless invocations;
- `agent` — input for host-created agent tool invocations.

High-authority capabilities are intentionally separate rather than exposed through a generic native invoke API.

## Compatibility

The npm SDK version, AppC container format, manifest version, presentation version, capability-contract version, and host-protocol version are independent compatibility axes.

The SDK sends the canonical host-protocol version and compatible hosts reject unsupported versions explicitly.

Required manifest capabilities must be available before an AppC is launched. Optional capabilities can be detected at runtime.

## Host neutrality

The same semantic SDK is used by Desktop and compatible Web hosts. Hosts may support different capability sets.

Desktop-only authority must fail compatibility or capability checks in a browser host rather than silently degrading into broader browser/native access.

AppC applications must not import Application Console Consumer internals or raw Tauri bridges.
