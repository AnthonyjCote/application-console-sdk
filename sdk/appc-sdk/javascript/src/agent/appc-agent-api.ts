import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";
import type { AppcAgentInputResult } from "@application-console/host-protocol";

export const agent=Object.freeze({
  input:(options:AppcHostRequestOptions={})=>
    sendAppcHostRequest<AppcAgentInputResult>("agent.input",{},options)
});
