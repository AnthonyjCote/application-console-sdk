import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";
import type { AppcExternalOpenResult } from "@application-console/host-protocol";

export const external=Object.freeze({
  open:(url:string,options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcExternalOpenResult>("external.open",{url},options)
});
