import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";
import type { AppcNotificationPermissionResult, AppcNotificationShowResult } from "@application-console/host-protocol";

export const notifications=Object.freeze({
  permission:(options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcNotificationPermissionResult>("notifications.permission",{},options),
  show:(title:string,body?:string,options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcNotificationShowResult>("notifications.show",{title,body},options)
});
