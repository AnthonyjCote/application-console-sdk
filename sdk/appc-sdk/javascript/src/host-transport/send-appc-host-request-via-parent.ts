import type {
  AppcHostRequest,
  AppcHostResponse
} from "@application-console/host-protocol";

import { AppcHostRequestFailure } from "./appc-host-request-failure.js";
import type { AppcHostRequestOptions } from "./send-appc-host-request.js";

export function sendAppcHostRequestViaParent<T>(
  request: AppcHostRequest,
  options: AppcHostRequestOptions = {}
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (options.signal?.aborted) {
      reject(new DOMException("AppC host request was aborted", "AbortError"));
      return;
    }
    const channel = new MessageChannel();
    const timeout = window.setTimeout(() => {
      options.signal?.removeEventListener("abort", abort);
      channel.port1.close();
      reject(
        new AppcHostRequestFailure(
          "host_transport_timeout",
          "Timed out waiting for the AppC Web host"
        )
      );
    }, 15_000);

    const abort=()=>{
      window.clearTimeout(timeout);
      channel.port1.close();
      reject(new DOMException("AppC host request was aborted", "AbortError"));
    };
    options.signal?.addEventListener("abort", abort, { once: true });

    channel.port1.onmessage = (event: MessageEvent<AppcHostResponse>) => {
      window.clearTimeout(timeout);
      options.signal?.removeEventListener("abort", abort);
      channel.port1.close();

      const response = event.data;
      if (!response.ok) {
        reject(
          new AppcHostRequestFailure(
            response.error.code,
            response.error.message
          )
        );
        return;
      }

      resolve(response.result as T);
    };

    window.parent.postMessage(
      {
        type: "application-console-host-request",
        request
      },
      "*",
      [channel.port2]
    );
  });
}
