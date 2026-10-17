import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";
import type { AppcSchedulerDeleteResult, AppcSchedulerGrantResult, AppcSchedulerListResult, AppcSchedulerUpsertResult } from "@application-console/host-protocol";

async function request(options:AppcHostRequestOptions={}):Promise<AppcSchedulerGrantResult>{
  const response=await fetch("/__appc_host__/v1/scheduler/request",{
    method:"POST",
    ...(options.signal ? {signal:options.signal} : {})
  });
  if(!response.ok) throw new Error(await response.text());
  return await response.json() as AppcSchedulerGrantResult;
}

export const scheduler=Object.freeze({
  request,
  upsert:(schedule_id:string,every_seconds:number,enabled=true,options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcSchedulerUpsertResult>(
      "scheduler.upsert",
      {schedule_id,every_seconds,enabled},
      options
    ),
  list:(options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcSchedulerListResult>("scheduler.list",{},options),
  delete:(schedule_id:string,options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcSchedulerDeleteResult>("scheduler.delete",{schedule_id},options)
});
