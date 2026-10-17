import type { AppcRuntimeCompleteResult } from "@application-console/host-protocol";
import { AppcHostRequestFailure } from "../host-transport/appc-host-request-failure.js";
import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";
import { getRuntimeCapabilities } from "./get-runtime-capabilities.js";
import { getRuntimeInfo } from "./get-runtime-info.js";

async function hasRuntimeCapability(
  name:string,
  options:AppcHostRequestOptions={}
):Promise<boolean>{
  const capabilities=await getRuntimeCapabilities(options);
  return capabilities.some((capability)=>capability.name===name&&capability.available);
}

async function requireRuntimeCapability(
  name:string,
  options:AppcHostRequestOptions={}
):Promise<void>{
  if(await hasRuntimeCapability(name,options))return;
  throw new AppcHostRequestFailure(
    "capability_unavailable",
    `AppC host capability is unavailable: ${name}`
  );
}

/** Runtime metadata, capability detection, and one-shot invocation completion. */
export const runtime = Object.freeze({
  info: getRuntimeInfo,
  capabilities: getRuntimeCapabilities,
  hasCapability: hasRuntimeCapability,
  requireCapability: requireRuntimeCapability,
  complete: (result?: unknown, options:AppcHostRequestOptions={}) =>
    sendAppcHostRequest<AppcRuntimeCompleteResult>(
      "runtime.complete",
      { result },
      options
    )
});
