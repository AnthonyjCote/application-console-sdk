import { deleteStorageValue } from "./delete-storage-value.js";
import { getStorageValue } from "./get-storage-value.js";
import { setStorageValue } from "./set-storage-value.js";

export const storage = Object.freeze({
  get: getStorageValue,
  set: setStorageValue,
  delete: deleteStorageValue
});
