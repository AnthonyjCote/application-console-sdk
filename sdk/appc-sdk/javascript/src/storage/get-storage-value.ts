import type { AppcStorageGetResult } from "@application-console/host-protocol";
import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";

export async function getStorageValue<T = unknown>(
  key: string,
  options:AppcHostRequestOptions={}
): Promise<T | undefined> {
  const result = await sendAppcHostRequest<AppcStorageGetResult<T>>(
    "storage.get",
    { key },
    options
  );
  return result.found ? (result.value as T) : undefined;
}
