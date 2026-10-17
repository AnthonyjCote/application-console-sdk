import type {
  AppcHostRequest,
  AppcHostResponse
} from "@application-console/host-protocol";

import { AppcHostRequestFailure } from "./appc-host-request-failure.js";
import type { AppcHostRequestOptions } from "./send-appc-host-request.js";

const HOST_PROTOCOL_PATH = "/__appc_host__/v1/request";

export async function sendAppcHostRequestViaFetch<T>(
  request: AppcHostRequest,
  options: AppcHostRequestOptions = {}
): Promise<T> {
  const response = await fetch(HOST_PROTOCOL_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request),
    ...(options.signal ? { signal: options.signal } : {})
  });

  if (!response.ok) {
    throw new AppcHostRequestFailure(
      "host_transport_failed",
      `AppC host request failed with HTTP ${response.status}`
    );
  }

  const payload = (await response.json()) as AppcHostResponse;
  if (!payload.ok) {
    throw new AppcHostRequestFailure(
      payload.error.code,
      payload.error.message
    );
  }

  return payload.result as T;
}
