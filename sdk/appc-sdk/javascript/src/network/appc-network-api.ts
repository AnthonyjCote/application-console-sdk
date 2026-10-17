import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";
import type { AppcNetworkFetchResult, AppcNetworkGrantResult } from "@application-console/host-protocol";

async function requestOrigin(
  origin:string,
  options:AppcHostRequestOptions={}
):Promise<AppcNetworkGrantResult>{
  const response=await fetch("/__appc_host__/v1/network/request",{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({origin}),
    ...(options.signal ? {signal:options.signal} : {})
  });
  if(!response.ok) throw new Error(await response.text());
  return await response.json() as AppcNetworkGrantResult;
}

export interface AppcNetworkRequestOptions extends AppcHostRequestOptions {
  method?:string;
  headers?:Record<string,string>;
  body_base64?:string;
}

export const network=Object.freeze({
  request:requestOrigin,
  fetch:(url:string,options:AppcNetworkRequestOptions={})=>
    sendAppcHostRequest<AppcNetworkFetchResult>(
      "network.fetch",
      {url,method:options.method??"GET",headers:options.headers??{},body_base64:options.body_base64},
      options.signal ? {signal:options.signal} : {}
    )
});
