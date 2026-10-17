import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";
import type { AppcClipboardReadResult, AppcClipboardWriteResult } from "@application-console/host-protocol";

export const clipboard=Object.freeze({
  readText:(options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcClipboardReadResult>("clipboard.read",{},options),
  writeText:(text:string,options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcClipboardWriteResult>("clipboard.write",{text},options)
});
