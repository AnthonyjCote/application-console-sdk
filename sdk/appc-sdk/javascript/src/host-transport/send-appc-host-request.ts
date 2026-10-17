import {
  APPC_HOST_PROTOCOL_VERSION,
  type AppcHostOperation,
  type AppcHostRequest
} from "@application-console/host-protocol";

import { sendAppcHostRequestViaFetch } from "./send-appc-host-request-via-fetch.js";
import { sendAppcHostRequestViaParent } from "./send-appc-host-request-via-parent.js";

export interface AppcHostRequestOptions { signal?: AbortSignal; }

export async function sendAppcHostRequest<T>(
  operation: AppcHostOperation,
  argumentsValue: unknown = {},
  options: AppcHostRequestOptions = {}
): Promise<T> {
  const request: AppcHostRequest = {
    version: APPC_HOST_PROTOCOL_VERSION,
    request_id: createRequestId(),
    operation,
    arguments: argumentsValue
  };

  if (window.parent !== window) {
    return sendAppcHostRequestViaParent<T>(request, options);
  }

  return sendAppcHostRequestViaFetch<T>(request, options);
}

function createRequestId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `appc-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
