import type { AppcStorageDeleteResult } from "@application-console/host-protocol";
import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";

export async function deleteStorageValue(
  key: string,
  options:AppcHostRequestOptions={}
): Promise<boolean> {
  const result = await sendAppcHostRequest<AppcStorageDeleteResult>(
    "storage.delete",
    { key },
    options
  );
  return result.deleted;
}
