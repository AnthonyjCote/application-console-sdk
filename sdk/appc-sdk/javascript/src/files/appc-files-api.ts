import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";
import type { AppcFileDeleteResult, AppcFileListResult, AppcFileReadResult, AppcFileStatResult, AppcFileWriteResult } from "@application-console/host-protocol";
import { userMediatedFiles } from "./user-mediated-file-api.js";

export const files = Object.freeze({
  open: userMediatedFiles.open,
  save: userMediatedFiles.save,
  app: Object.freeze({
    read: (path:string,options:AppcHostRequestOptions={}) =>
      sendAppcHostRequest<AppcFileReadResult>("files.app.read",{path},options),
    write: (path:string,data_base64:string,options:AppcHostRequestOptions={}) =>
      sendAppcHostRequest<AppcFileWriteResult>("files.app.write",{path,data_base64},options),
    delete: (path:string,options:AppcHostRequestOptions={}) =>
      sendAppcHostRequest<AppcFileDeleteResult>("files.app.delete",{path},options),
    list: (path=".",options:AppcHostRequestOptions={}) =>
      sendAppcHostRequest<AppcFileListResult>("files.app.list",{path},options),
    stat: (path:string,options:AppcHostRequestOptions={}) =>
      sendAppcHostRequest<AppcFileStatResult>("files.app.stat",{path},options)
  })
});
