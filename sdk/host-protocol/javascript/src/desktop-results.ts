export interface AppcClipboardReadResult { text: string; }
export interface AppcClipboardWriteResult { written: boolean; }
export interface AppcNotificationPermissionResult { state: "granted" | "denied" | "prompt"; }
export interface AppcNotificationShowResult { shown: boolean; }
export interface AppcExternalOpenResult { opened: boolean; }
export interface AppcWindowActionResult { applied: boolean; }
