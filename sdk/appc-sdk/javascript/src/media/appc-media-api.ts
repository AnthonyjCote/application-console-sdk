import type { AppcPickedFileResult } from "@application-console/host-protocol";

export type AppcMediaKind="image"|"audio"|"video";

export const media=Object.freeze({
  pick:async(kind:AppcMediaKind,options:{signal?:AbortSignal}={}):Promise<AppcPickedFileResult>=>{
    if(options.signal?.aborted)throw new DOMException("Media selection was aborted","AbortError");
    const response=await fetch("/__appc_host__/v1/media/pick",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({kind}),
      ...(options.signal ? {signal:options.signal} : {})
    });
    if(response.status===204)throw new DOMException("User cancelled media selection","AbortError");
    if(!response.ok)throw new Error(await response.text());
    return await response.json() as AppcPickedFileResult;
  }
});
