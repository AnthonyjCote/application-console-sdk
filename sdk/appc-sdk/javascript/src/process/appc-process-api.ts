import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";
import type { AppcProcessGrantResult, AppcProcessKillResult, AppcProcessPollResult, AppcProcessSpawnResult } from "@application-console/host-protocol";

async function request(
  workspace_handle:string,
  options:AppcHostRequestOptions={}
):Promise<AppcProcessGrantResult>{
  const response=await fetch("/__appc_host__/v1/process/request",{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({workspace_handle}),
    ...(options.signal ? {signal:options.signal} : {})
  });
  if(!response.ok) throw new Error(await response.text());
  return await response.json() as AppcProcessGrantResult;
}

export const process=Object.freeze({
  request,
  spawn:(workspace_handle:string,program:string,args:string[]=[],cwd=".",options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcProcessSpawnResult>(
      "process.spawn",
      {workspace_handle,program,args,cwd},
      options
    ),
  poll:(process_id:string,options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcProcessPollResult>("process.poll",{process_id},options),
  kill:(process_id:string,options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcProcessKillResult>("process.kill",{process_id},options)
});
