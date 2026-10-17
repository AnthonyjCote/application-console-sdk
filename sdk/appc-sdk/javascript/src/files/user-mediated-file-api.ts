import type {
  AppcPickedFileResult,
  AppcSavedFileResult
} from "@application-console/host-protocol";
import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";

export const userMediatedFiles=Object.freeze({
  open:Object.freeze({
    pick:(extensions:string[]=[],options:AppcHostRequestOptions={})=>
      sendAppcHostRequest<AppcPickedFileResult>(
        "files.open.pick",
        {extensions},
        options
      )
  }),
  save:Object.freeze({
    pick:(
      data_base64:string,
      suggested_name?:string,
      options:AppcHostRequestOptions={}
    )=>sendAppcHostRequest<AppcSavedFileResult>(
      "files.save.pick",
      {data_base64,suggested_name},
      options
    )
  })
});
