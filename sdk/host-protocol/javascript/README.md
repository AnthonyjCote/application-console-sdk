# @application-console/host-protocol

Shared TypeScript contract for the V1 AppC host protocol.

The protocol is the boundary between untrusted guest application code and an AppC host. Guest applications normally consume `@application-console/appc-sdk`; host implementations and tooling use this package directly.

## V1 operations

- `runtime.info`
- `runtime.capabilities`
- `storage.get`
- `storage.set`
- `storage.delete`

The package also exports V1 request and managed-storage resource ceilings so Consumer and Web hosts enforce the same limits.

An AppC request never supplies an authoritative application identity. Hosts derive identity from trusted runtime context.
