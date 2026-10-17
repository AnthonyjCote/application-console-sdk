import type { AppcRuntimeInfoResult } from "@application-console/host-protocol";
import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";

export async function getRuntimeInfo(
  options:AppcHostRequestOptions={}
): Promise<AppcRuntimeInfoResult> {
  return sendAppcHostRequest<AppcRuntimeInfoResult>(
    "runtime.info",
    {},
    options
  );
}
