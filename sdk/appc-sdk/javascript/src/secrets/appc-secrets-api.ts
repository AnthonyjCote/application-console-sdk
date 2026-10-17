import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";
import type { AppcSecretDeleteResult, AppcSecretGetResult, AppcSecretSetResult } from "@application-console/host-protocol";

export const secrets=Object.freeze({
  get:(key:string,options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcSecretGetResult>("secrets.get",{key},options),
  set:(key:string,data_base64:string,options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcSecretSetResult>("secrets.set",{key,data_base64},options),
  delete:(key:string,options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcSecretDeleteResult>("secrets.delete",{key},options)
});
