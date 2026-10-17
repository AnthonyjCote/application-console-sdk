import type { AppcRuntimeCapabilityDescriptor } from "@application-console/host-protocol";
import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";

export async function getRuntimeCapabilities(
  options:AppcHostRequestOptions={}
): Promise<AppcRuntimeCapabilityDescriptor[]> {
  return sendAppcHostRequest<AppcRuntimeCapabilityDescriptor[]>(
    "runtime.capabilities",
    {},
    options
  );
}
