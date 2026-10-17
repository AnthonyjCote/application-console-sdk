import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";
import type { AppcBackgroundDisableResult, AppcBackgroundRequestResult, AppcBackgroundStatusResult } from "@application-console/host-protocol";

async function request(options:AppcHostRequestOptions={}):Promise<AppcBackgroundRequestResult>{
  const response=await fetch("/__appc_host__/v1/background/request",{
    method:"POST",
    ...(options.signal ? {signal:options.signal} : {})
  });
  if(!response.ok) throw new Error(await response.text());
  return await response.json() as AppcBackgroundRequestResult;
}

export const background=Object.freeze({
  request,
  status:(options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcBackgroundStatusResult>("background.status",{},options),
  disable:(options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcBackgroundDisableResult>("background.disable",{},options)
});
